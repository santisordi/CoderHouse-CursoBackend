import { Router } from 'express';
import productsController from '../controllers/product.controller.js';
import { passportError, authorization } from '../utils/messageErrors.js';
import { generateMockProducts } from '../controllers/mockingController.js';


const productRouter = Router();
//Ruta inicial de Products
productRouter.get('/', productsController.getProducts);
//Ruta para traer un producto según su ID
productRouter.get('/:pid', productsController.getProduct);
//Mocking products
productRouter.get('/mockingproducts', passportError('jwt'), authorization('Admin'), generateMockProducts)
//Ruta para crear un producto
productRouter.post('/', (req,res,next) => {
    const { title, description, stock, price, code, category } = req.body;
    try {
        if ((!title || !description || !stock || !price || !code || !category)) {
            CustomError.createError({
                name: 'Error creating product',
                cause: generateProductErrorInfo({ title, description, stock, price, code, category }),
                message: 'All fields must be completed',
                code: EErrors.ROUTING_ERROR,
            });
        };
        next();
    } catch (error) {
        next(error);
    };
}, passportError('jwt'), authorization('Admin'), productsController.postProduct);
//Ruta para crear un producto o actualizar en caso de que    exista
productRouter.put('/:pid', passportError('jwt'), authorization('Admin'), productsController.putProduct);
//Ruta para borrar un producto según su ID
productRouter.delete('/:pid', passportError('jwt'), authorization('Admin'), productsController.deleteProduct);

export default productRouter;

