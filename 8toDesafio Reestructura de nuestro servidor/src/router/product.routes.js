import { Router } from 'express';
import productsController from '../controllers/product.controller.js';

const productRouter = Router();
//Ruta inicial de Products
productRouter.get('/', productsController.getProduct);
//Ruta para traer un producto según su ID
productRouter.get('/:pid', productsController.getProduct);
//Ruta para crear un producto
productRouter.post('/', productsController.postProduct);
//Ruta para crear un producto o actualizar en caso de que exista
productRouter.put('/:pid', productsController.putProduct);
//Ruta para borrar un producto según su ID
productRouter.delete('/:pid', productsController.deleteProduct);

export default productRouter;

