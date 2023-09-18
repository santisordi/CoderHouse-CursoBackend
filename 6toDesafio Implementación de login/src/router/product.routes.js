import { Router } from 'express';
import productsModel from '../models/products.model.js';

const productRouter = Router();

productRouter.get('/', async (req, res) => {
    let { limit, page, category, status, sort } = req.query
    let sortOption;
	sort == 'asc' && (sortOption = 'price');
	sort == 'desc' && (sortOption = '-price');
    try {
        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: sortOption || null,
        };
        const query = {};
            category && (query.category = category);
            status && (query.status = status);
        
        const prods = await productsModel.paginate(query, options)
        res.status(200).send({ result: 'OK', message: prods })
    } catch (error) {
        res.status(400).send({ error: `Error displaying products:  ${error}` })
    }
})

productRouter.get("/:pid", async (req, res)=>{
    const {pid} = req.params;
    try {
        const prod = await productsModel.findById(pid);
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

productRouter.put("/:pid", async (req, res)=>{
    const {pid} = req.params
    const { title, description, stock, code, price, category, status } = req.body;
    
    try {
        const prod = await productsModel.findByIdAndUpdate(pid, {
          title, description, stock, code, price, category, status
        });
      
        if (prod !== null && prod !== undefined) {
          res.status(200).send({ resultado: 'ok', message: prod });
        } else {
          res.status(404).send({ resultado: 'Not Found', message: 'Producto no encontrado' });
        }
      } catch (error) {
        res.status(400).send({ error: `Error al actualizar productos: ${error}` });
      }
      
      
}); 


productRouter.delete("/:pid", async (req, res)=>{
    const {pid} = req.params;
    
    try {
        const prod = await productsModel.findByIdAndDelete(pid);
        
        if (prod)
            res.status(200).send({resultado: 'ok', message: prod });
        else
        res.status(404).send({resultado: 'Not Found', message: prod });
    
}catch (error){
    res.status(400).send({error: `Error al eliminar productos: ${error}`});
};
}); 


export default productRouter;