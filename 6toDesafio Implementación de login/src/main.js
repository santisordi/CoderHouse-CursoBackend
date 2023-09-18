import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { __dirname } from './path.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import session from 'express-session'
// import multer from 'multer';
// import { userModel } from './models/users.model.js';

import userRouter from './router/user.routes.js';
import productRouter from './router/product.routes.js';
import cartRouter from './router/carts.routes.js'; 
import messageRouter from './router/messages.routes.js';


const app = express();
const PORT = 4000;

//conexion a atlas
mongoose.connect(process.env.MONGO_URL)
    .then (async () => {
        console.log('BDD conectada')
    })
    .catch((error)=> console.log("Error en conexion con MongoDB ATLAS: ", error));

//Server
const server = app.listen(PORT, ()=>{
    console.log(`Servidor Express Puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

const io = new Server(server);

//middlewares
app.use(express.json());
app.use(cookieParser(process.env.SIGNED_COOKIE));//se firma la cookie para q no puedan modificarla
app.use(express.urlencoded({extended: true}));
app.engine('handlebars', engine()); //defino que trabajo con habndlebars y guardo config de engine
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')); //esta es otra forma de trabajar con rutas
// const upload = multer({ storage: storage});
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true    
}));

function auth (req, res, next) {
    console.log(req.session.email);
    if(req.session.email == "admin@admin.com") {
        return next(); // continua con la ejecucion normal
    } return res.send ("No tenes acceso a este contenido");
}
// app.use(Session({ //Config session en app en mongo
//     store: MongoStore.create({
//         mongoURL: process.env.MONGO_URL, 
//         mongoOptions: {useNewUrlParse: true, useUnifiedTopology: true},// cuando conecto mi app me permite trabajar con el controlador oficial, se adapta a los nuevos cambios cuando trabjo con clusters. una topologia unificada.
//         ttl: 90 //time to live en seg
//     })
// }))

const mensajes = [];
//Conexion Socket.io
io.on("connection", (socket)=>{
    console.log("Conexion con Socket io");
    
    socket.on ('mensaje', info =>{
        console.log(info);
        mensajes.push(info);
        io.emit('mensajes', mensajes); // emito el array de mensajes
    })
    
    // socket.on('load', async () => {
    //     const products = await productManager.getProducts();
    //     socket.emit('products', products);
    // });
    
    // socket.on('newProduct', async product => {
    //     await productManager.addProducts(product);
    //     const products = await productManager.getProducts();
    //     socket.emit('products', products);
    // });    

    socket.on('newProduct',  (product) => {
        console.log(product)
        socket.emit('mensajeProductoCreado', 'Prodcuto creado correctamente')
    });
});

//Routes
app.use('/static', express.static (path.join(__dirname, '/public')));
app.use('/api/products', productRouter); //aca se enlaza la ruta al use
app.use('/api/carts', cartRouter);
app.use('/api/users', userRouter);
app.use('/api/message', messageRouter );

app.get('/static', (req, res) => {
    res.render('index', {
        rutaCSS: 'index',
        rutaJS: 'index',
    });
});

app.get('/static/realtimeproducts', (req, res) => { //HBS  
    res.render('realTimeProducts', { 
        rutaCSS: "realTimeProducts",
        rutaJS: "realTimeProducts"
    });    
});

app.get ('/static/chat', (req, res) => {
    res.render('chat', {
    rutaCSS: 'chat',
    rutaJS: 'chat',
    });
});

app.get('/static/products', (req, res) => {
	res.render('products', {
		rutaCSS: 'products',
		rutaJS: 'products',
	});
});

app.get('/static/carts/:cid', (req, res) => {
	res.render('carts', {
		rutaCSS: 'carts',
		rutaJS: 'carts',
	});
});

app.get('/setCookie', (req, res)=> {
        res.cookie('CookieCookie', 'Esto es el valor de una cookie', {maxAge: 6000, signed:true}).send('Cookie creada');
});

app.get('/getCookie', (req,res)=>{
    res.send(req.signedCookies)//consulta solo las firmada    
    // res.send(req.cookies); //consulta todas las cookies
});

app.get ('/session', (req, res)=> {
    if (req.session.counter) {
        req.session.counter ++;
        res.send(`Has entrado ${req.session.counter} veces a mi pagina`)
    } else {
        req.session.counter = 1;
        res.send("Hola, por primera vez");
    };
})

app.get ('/login', (req,res)=>{
    const{ email, password } = req.body;
    if(email === "admin@admin.com" && password ==="1234") {
        req.session.email = email;
        req.session.password = password;

        return res.send ("Usuario Logeado");
    }   return res.send ("Login Fallido")
}),

app.get('/admin', auth, (req, res) => {
        res.send("sos admin")
});

app.get('/logout', (req,res)=> {
    req.session.destroy(()=>{
        res.send("Salio de la sesion");
    });
});

