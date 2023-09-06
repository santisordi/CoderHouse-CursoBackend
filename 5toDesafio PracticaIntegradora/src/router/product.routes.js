import { Router } from 'express';
import productsModel from '../models/products.model.js';
// import ProductManager from '../controllers/ProductManager.js';

const productRouter = Router();
// const product = new ProductManager();

productRouter.get("/", async (req, res)=>{
    const {limit} = req.query;
    try {
        const prod = await productsModel.find().limit(limit);     
        res.status(200).send({resultado: 'ok', message: prod });
    }catch (error){
         res.status(400).send({error: `Error al consultar productos: ${error}`});
    };
}); 

productRouter.get("/:id", async (req, res)=>{
    const {id} = req.params;
    try {
        const prod = await productsModel.findById(id);
        if (prod)
            res.status(200).send({resultado: 'ok', message: prod });
        else
            res.status(404).send({resultado: 'Not Found', message: prod });
            
    }catch (error){
         res.status(400).send({error: `Error al consultar productos: ${error}`});
    };
}); 

productRouter.post("/", async (req, res)=>{
    const { title, description, stock, code, price, category } = req.body;
    
    try {
        const respuesta = await productsModel.create({
            title, description, stock, code, price, category
        });
            res.status(200).send({resultado: 'ok', message: respuesta });           
    }catch (error){
         res.status(400).send({error: `Error al crear el producto: ${error}`});
    };
}); 

productRouter.put("/:id", async (req, res)=>{
    const {id} = req.params
    const { title, description, stock, code, price, category, status } = req.body;
    
    try {
        const respuesta = await productsModel.findByIdAndUpdate(id, {
            title, description, stock, code, price, category, status});
            
        if (prod)
            res.status(200).send({resultado: 'ok', message: respuesta });
        else
            res.status(404).send({resultado: 'Not Found', message: res });
            
    }catch (error){
         res.status(400).send({error: `Error al actualizar productos: ${error}`});
    };
}); 


productRouter.delete("/:id", async (req, res)=>{
    const {id} = req.params;
    
    try {
        const respuesta = await productsModel.findByIdAndDelete(id );
        
        if (prod)
            res.status(200).send({resultado: 'ok', message: respuesta });
        else
        res.status(404).send({resultado: 'Not Found', message: res });
    
}catch (error){
    res.status(400).send({error: `Error al eliminar productos: ${error}`});
};
}); 


export default productRouter;