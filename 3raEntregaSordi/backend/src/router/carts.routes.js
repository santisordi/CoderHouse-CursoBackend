import { Router } from 'express';
import cartsController from '../controllers/carts.controller.js';

const cartRouter = Router();
//Get Carts 
cartRouter.get('/', cartsController.getCarts);
//Get cart by id
cartRouter.get('/:cid', cartsController.getCart);
// Create Carts 
cartRouter.post('/', cartsController.postCart);
//add product to cart (agrega el producto ok y actualiza si existe)
cartRouter.put('/:cid/products/:pid', cartsController.putProductsToCart);
//update cart by id 
cartRouter.put('/:cid', cartsController.updateProductToCart);
// delete pid from cart 
cartRouter.delete('/:cid/products/:pid', cartsController.deleteProductCart);
//Delete all prodcuts from cart
cartRouter.delete('/:id', cartsController.deleteProductsCart);

export default cartRouter;

