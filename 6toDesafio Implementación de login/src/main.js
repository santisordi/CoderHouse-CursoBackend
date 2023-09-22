import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { __dirname } from './path.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoConnect from './dataBase.js';

// import multer from 'multer';
// import { userModel } from './models/users.model.js';

import userRouter from './router/user.routes.js';
import productRouter from './router/product.routes.js';
import cartRouter from './router/carts.routes.js'; 
import messageRouter from './router/messages.routes.js';
import staticsRouter from './router/statics.routes.js';
import sessionRouter from './router/sessions.routes.js';
import profileRouter from './router/profile.routes.js';

const app = express();
const PORT = 4000;
//conexion a atlas
mongoConnect();
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
app.use(session({ //Config session en app en mongo
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL, 
        ttl: 200 //time to live en seg
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.engine('handlebars', engine()); //defino que trabajo con habndlebars y guardo config de engine
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')); //esta es otra forma de trabajar con rutas
// const upload = multer({ storage: storage});
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false    
}));

function auth (req, res, next) { //middle de ruta admin
    if(req.session.email == "admin@admin.com" && req.session.password == "1234") {
        return next(); // continua con la ejecucion normal de la ruta
    } return res.send ("No tenes acceso a este contenido");
}

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
app.use('/static', express.static (path.join(__dirname, '/public')), staticsRouter);
app.use('/api/products', productRouter); //aca se enlaza la ruta al use
app.use('/api/carts', cartRouter);
app.use('/api/users', userRouter);
app.use('/api/message', messageRouter );
app.use('/api/sessions', sessionRouter );
app.use('/api/profile', profileRouter);

