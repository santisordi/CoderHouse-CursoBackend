import { Router } from 'express';
import productsController from '../controllers/product.controller.js';
import { passportError, authorization } from '../utils/messageErrors.js';
import { generateMockProducts } from '../controllers/mockingController.js';
import CustomError from "../services/errors/CustomError.js";
import EErrors from '../services/errors/enums.js';
import { generateProductErrorInfo } from '../services/errors/info.js';



const productRouter = Router();
//Ruta inicial de Products
productRouter.get('/', productsController.getProducts);
//Ruta para traer un producto según su ID
productRouter.get('/:pid', productsController.getProduct);
//Mocking products
productRouter.get('/mockingproducts', passportError('jwt'), authorization('Admin'), generateMockProducts)
//Ruta para crear un producto
sessionRouter.post('/register', (req, res, next) => {
    const { first_name, last_name, email, password, age } = req.body;
    if (!last_name || !first_name || !email || !password || !age) {
       const customError = CustomError.createError({
            name: 'Error creating user',
            cause: generateUserErrorInfo({ first_name, last_name, email, password, age }),
            message: 'All fields must be completed',
            code: EErrors.DATOS_INVALIDOS_ERROR
        });
        return next(customError);
    }
    next();

productRouter.put('/:pid', passportError('jwt'), authorization('Admin'), productsController.putProduct);
//Ruta para borrar un producto según su ID
productRouter.delete('/:pid', passportError('jwt'), authorization('Admin'), productsController.deleteProduct);

export default productRouter;

