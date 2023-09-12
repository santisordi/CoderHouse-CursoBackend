import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { __dirname } from './path.js';
import path from 'path';
// import multer from 'multer';

import userRouter from './router/user.routes.js';
import productRouter from './router/product.routes.js';
import cartRouter from './router/carts.routes.js'; 
import messageRouter from './router/messages.routes.js';

const app = express();
const PORT = 4000;

//conexion a atlas
mongoose.connect('mongodb+srv://santiagosordi:Sds31263550@cluster0.l8imdid.mongodb.net/?retryWrites=true&w=majority')
    .then (()=> console.log('BDD conectada'))
    .catch((error)=> console.log("Error en conexion con MongoDB ATLAS: ", error));

//Server
const server = app.listen(PORT, ()=>{
    console.log(`Servidor Express Puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

const io = new Server(server);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.engine('handlebars', engine()); //defino que trabajo con habndlebars y guardo config de engine
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')); //esta es otra forma de trabajar con rutas
// const upload = multer({ storage: storage});

const mensajes = [];
//Conexion Socket.io
io.on("connection", (socket)=>{
    console.log("Conexion con Socket io");
    
    socket.on ('mensaje', info =>{
        console.log(info);
        mensajes.push(info);
        io.emit('mensaje', mensajes); // emito el array de mensajes
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
    rutaJS: 'chat'
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

