import {Router} from 'express';
import { ProductManager } from '../controllers/productManager.js';

const productManager = new ProductManager('src/models/productos.json')

const routerProd = Router ();

 // para no repetir la ruta /product , se importa el routerProd del main
routerProd.get('/', async (req,res)=>{
    const { limit} = req.query;

    const prods = await productManager.getProducts();
    const productos = prods.slice(0, limit);
    res.status(200).send(productos);
}); 
routerProd.get('/:id', async (req, res)=>{
    
    const {id}= req.params;
    
    const prod = await productManager.getProductsById(parseInt(id));

    if(prod)
        res.status(200).send (prod);
    else
        res.status(400).send("Producto no existente");   

});

routerProd.post('/', async (req,res )=>{
    
    const confirmation = await productManager.addProduct(req.body);
    
    if (confirmation)
        res.status(200).send("Producto creado exitosamente");
    else
        res.status(400).send("Producto ya existente");

});

routerProd.put('/:id', async (req,res )=>{
    
    const confirmation = await productManager.updateProduct(req.params.id, req.body);
    
    if (confirmation)
        res.status(200).send("Producto actualizado exitosamente");
    else
        res.status(404).send("Producto no encontrado");

});  

routerProd.delete('/:id', async (req, res)=>{

    const confirmation = await productManager.deleteProduct(req.params.id);
    
    if (confirmation)
        res.status(200).send("Producto eliminado exitosamente");
    else
        res.status(404).send("Producto no encontrado");

}); 

export default routerProd;

