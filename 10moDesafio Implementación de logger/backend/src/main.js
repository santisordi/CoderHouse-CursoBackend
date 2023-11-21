import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import { configureSocket } from './socket.js';
import { __dirname } from './path.js';
import path from 'path';
import MongoStore from 'connect-mongo';
import mongoConnect from './dataBase.js';
import passport from 'passport';
import initializePassport from './config/passport.js';
import staticsRouter from './router/statics.routes.js';
import router from './router/main.routes.js';
import cors from 'cors';
import errorHandler from './middlewares/errors/errorHandler.js';
import { addLogger } from './utils/logger.js';
import { requestLogger } from './middlewares/requestLogger.js';

// import multer from 'multer';
// import { userModel } from './models/users.model.js';

const whiteList = ['http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) != -1 || !origin) {// si existe dentro de la withe list
            callback(null, true)
        } else {
            callback(new Error('Acceso dengado'));
        };
    }   
};

const app = express();
app.use(addLogger);

app.get('/', requestLogger, (req, res) => {
    req.logger.warn('alerta')
    res.send({message: "PruebaLogger"});
});

const PORT = 4000;
//conexion a atlas
mongoConnect();
//Server
const server = app.listen(PORT, ()=>{
    console.log(`Servidor Express Puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

//Conexion a Socket
configureSocket(server)

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));//se firma la cookie para q no puedan modificarla
app.use(express.urlencoded({extended: true}));
app.use(session({ //Config session en app en mongo
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL, 
        ttl: 200 //time to live en seg
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,//estaban en false
    saveUninitialized: true
}));

app.engine('handlebars', engine()); //defino que trabajo con habndlebars y guardo config de engine
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')); //esta es otra forma de trabajar con rutas
// const upload = multer({ storage: storage});
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, //Permite que la sesion permanezca activa en caso de estar inactivo. Con false muere la sesión
    saveUninitialized: false //Permite guardar cualquier sesion aun cuando el objeto de sesion no tengo nada por contener   
}));

initializePassport(); // se aplica esta estrategia de login 
app.use(passport.initialize()); //se inicializa passport
app.use(passport.session()); //se inicializa para trabajar con las sesiones de mis usuarios

//Routes
app.use('/static', express.static (path.join(__dirname, '/public')), staticsRouter);
app.use('/', router);


app.get('/*',(req,res)=>{   //Ruta con error 404 que se utiliza a nivel general
    res.send("Error 404: Page not found");
});

app.use(errorHandler);