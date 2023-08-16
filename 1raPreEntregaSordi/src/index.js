import express from 'express';
import ProductManager from './controllers/ProductManager.js';

const product = new ProductManager;

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/products", async (req, res)=>{
    let newProduct = req.body;
    response.send(await product.writeProducts(newProduct))       
});

app.listen(PORT, ()=>{
    console.log(`Servidor Express Puerto ${PORT}`);
    console.log(`localhost:${PORT}`);
});