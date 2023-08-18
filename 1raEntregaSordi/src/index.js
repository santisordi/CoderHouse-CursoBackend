import express from 'express';
import ProductRouter from './router/product.routes.js';
import CartRouter from './router/carts.routes.js';

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products", ProductRouter); //aca se enlaza la ruta al use
app.use("/api/cart", CartRouter); 

app.listen(PORT, ()=>{
    console.log(`Servidor Express Puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
