import express from 'express';
import routerProd from './routes/products.routes';
import { __dirname } from './path.js';

const PORT = 4000;
const app = express();

//Middlewarers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Rutas
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/product', routerProd);

//Server 
app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`);
})