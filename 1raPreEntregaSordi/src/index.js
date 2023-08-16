import express from 'express';
import ProductManager from './controllers/ProductManager.js';

const product = new ProductManager;

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/products", async (req, res)=>{
    res.send(await product.getProducts());  
    
}); 

app.get("/products:id", async (req, res)=>{
    let id = req.params.id;
    res.send(await product.getProducts());  
    
}); 


app.post("/products", async (req, res)=>{
    let newProduct = req.body;
    res.send(await product.addProducts(newProduct));       
}); 

app.listen(PORT, ()=>{
    console.log(`Servidor Express Puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
