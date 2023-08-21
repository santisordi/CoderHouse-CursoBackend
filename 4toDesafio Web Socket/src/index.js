import express from 'express';
import multer from 'multer';
import {engine} from 'express-handlebars';
import ProductRouter from './router/product.routes.js';
import CartRouter from './router/carts.routes.js';
import { __dirname } from './path.js';
import path from 'path';

const PORT = 4000;
const app = express();

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
const upload = multer({ storage: storage});

//Routes
app.use('/static', express.static (path.join(__dirname, '/public')));
app.use('/api/products', ProductRouter); //aca se enlaza la ruta al use
app.use('/api/cart', CartRouter); 
app.get('/static', (req, res) => { //HBS  
    const user = {
        nombre: "Lucia",
        cargo: "tutor" 
    }

    const cursos = [
        {numCurso: "123", dia : "LyM", horario: "mañana"},
        {numCurso: "456", dia : "MyJ", horario: "tarde"},
        {numCurso: "789", dia : "S", horario: "noche"}
    ];
    
    res.render("users", { //indico la plantilla que utilizo
        nombreUsuario: "Santiago",
        titulo: "users",
        usuario: user,
        rutaCSS: "user.css",
        isTutor: user.cargo == "tutor",
        cursos: cursos
    })

})
app.post('/upload', upload.single('producto'), (req, res)=>{
    console.log(req.file);
    console.log(req.body);
    res.status(200).send("Imagen cargada")
});

//Server
app.listen(PORT, ()=>{
    console.log(`Servidor Express Puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
