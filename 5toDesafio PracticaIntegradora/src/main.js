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
// import  ProductManager from './controllers/ProductManager.js';


const app = express();
const PORT = 4000;
// const productManager = new ProductManager('./src/models/products.json');

//conexion a atlas
mongoose.connect('mongodb+srv://:@cluster0.l8imdid.mongodb.net/?retryWrites=true&w=majority')
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

//Conexion Socket.io
io.on("connection", (socket)=>{
    console.log("Conexion con Socket io");
    
    socket.on('load', async () => {
        const products = await productManager.getProducts();
        socket.emit('products', products);
    });
    
    socket.on('newProduct', async product => {
        await productManager.addProducts(product);
        const products = await productManager.getProducts();
        socket.emit('products', products);
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

// socket.on('mensaje', info =>{
    //     console.log(info);
    //     socket.emit('respuesta', true);
    // })
    
    // socket.on('juego', (infoJuego)=>{
        //     if(infoJuego == 'poker')
        //     console.log("Conexion a poker");
        //     else
        //         console.log("Conexion a Truco");
        // });


// const user = {
    //     nombre: "Lucia",
    //     cargo: "tutor" 
    // }
    
    // const cursos = [
        //     {numCurso: "123", dia : "LyM", horario: "mañana"},
                //     {numCurso: "456", dia : "MyJ", horario: "tarde"},
                //     {numCurso: "789", dia : "S", horario: "noche"}
                // ];
                
                // res.render("users", { //indico la plantilla que utilizo
                //     nombreUsuario: "Santiago",
                //     titulo: "users",
                //     usuario: user,
                //     rutaCSS: "user.css",
                //     isTutor: user.cargo == "tutor",
                //     cursos: cursos
                // });
                
                
                // app.post('/upload', upload.single('producto'), (req, res)=>{
                    //     console.log(req.file);
                    //     console.log(req.body);
                    //     res.status(200).send("Imagen cargada")
                    // });
                    
                    // //Config Multer
                    // const storage = multer.diskStorage({
                    //     destination: (req, file, cb) => { //cb es el call back de la Fn
                    //         cb(null, 'src/public/img'); // null para que no envie errores.
                    //     },
                    //     filename: (req, file, cb) => {
                    //         cb(null, `${Date.now()}${file.originalname}`)
                    //     }
                    // });
