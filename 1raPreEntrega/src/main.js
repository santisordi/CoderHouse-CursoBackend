import express from 'express';
import multer from 'multer';
import routerProd from './routes/products.routes.js';
import { __dirname } from './path.js';
import path from 'path'

const PORT = 4000;
const app = express();

//Config multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img'); //esto es para el manejo de errores en el callback. se pone null para que no los envie.

    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`) // fecha actual + nombre de archivo
    }
})

//Middlewarers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ storage: storage })

//Rutas
// app.use('/static', express.static(__dirname + '/public')) es igual a linea 15
app.use('/static', express.static(path.join(__dirname, '/public')));
app.use('/api/product', routerProd);
// app.use('/api/carts', routerCart);

app.post('/upload', upload.single('product'), (req, res)=>{ //single para una sola img - .file para varias
    res.status(200).send ("Imagen cargada");
})

//Server 
app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`);
})