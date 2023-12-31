import express from 'express';
import multer from 'multer';
import {engine} from 'express-handlebars';
import { Server } from 'socket.io';
import ProductRouter from './router/product.routes.js';
import CartRouter from './router/carts.routes.js';
import  ProductManager from './controllers/ProductManager.js';
import { __dirname } from './path.js';
import path from 'path';

const PORT = 4000;
const productManager = new ProductManager('./src/models/products.json');

const app = express();

//Server
const server = app.listen(PORT, ()=>{
    console.log(`Servidor Express Puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

const io = new Server(server);

//Config Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => { //cb es el call back de la Fn
        cb(null, 'src/public/img'); // null para que no envie errores.
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
});

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
app.use('/api/products', ProductRouter); //aca se enlaza la ruta al use
app.use('/api/cart', CartRouter);

app.get('/static', (req, res) => {
	res.render('index', {
		rutaCSS: 'index',
		rutaJS: 'index',
	});
});

//HBS 
app.get('/static/realtimeproducts', (req, res) => { 
        res.render('realTimeProducts', { 
            rutaCSS: "realTimeProducts",
            rutaJS: "realTimeProducts"
        });
});   
   