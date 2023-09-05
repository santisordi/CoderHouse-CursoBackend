import { Router } from 'express';
import CartManager from '../controllers/CartManager.js';
import cartModel from '../models/carts.models.js';

const cartRouter = Router();
const carts = new CartManager;

cartRouter.get('/', async (req, res) => {
    const {limit} = req.query
    try{
        const carts = await cartModel.find().limit(limit);
        res.status(200).send({ resultado: 'OK', message: carts });

    }catch (error) {
        res.status(400).send({error: `Error al consultar carrito: ${error}`})
    }
} );

cartModel.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try{
        const cart = await cartModel.findById(cid);
        cart ? res.status(200).send({resultado: 'OK', messag:cart})
            : res.status(404).send({resultado:'Not Found', message: cart})

    }catch (error){
        res.status(400).send ({ error:`Error al consultar carritos: ${error}`});
    }
});

cartModel.post('/', async (req, res)=> {
    const {id_prod, quantity} = req.body;

    try{
        const respuesta = await cartModel.create({
            id_prod,
            quantity,
        });
        res.status(200).send({ resultado: 'OK', message: respuesta });
        
    } catch(error){
        res.status(400).send ({ error:`Error al crear carritos: ${error}`});

    }
});

cartModel.update('/:cid', async (req, res) => {
    const {cid} = req.params;
    const {id_prod, quantity} =req.body;

    try {
        const cart = await cartModel.findByIdAndUpdate(cid, {
            id_prod,
            quantity,
        });
        cart ? res.status(200).send({resultado: 'OK', messag:cart})
            : res.status(404).send({resultado:'Not Found', message: cart})
    } catch(error){
        res.status(400).send ({ error:`Error al actualizar carritos: ${error}`});
    };
});

cartModel.deleteMany('/:cid', (req, res) => {
    const { cid } = req.params;
    try{
        const cart = await cartModel.findByIdAndDelete(cid);
        cart ? res.status(200).send({resultado: 'OK', messag:cart})
        : res.status(404).send({resultado:'Not Found', message: cart})
    } catch (error){
        res.status(400).send ({ error:`Error al eliminar carritos: ${error}`});

    }
})

export default cartRouter;
    

//JSON
    // CartRouter.post("/", async (req, res) =>{
    //     res.send(await carts.addCarts());
    // });
    
    // CartRouter.get('/', async (req, res)=>{
    //     res.send(await carts.readCarts());
    // });
    
    // CartRouter.get('/:id', async (req, res)=>{
    //     res.send(await carts.getCartsById(req.params.id));
    // });
    
    // CartRouter.post('/:cid/products/:pid', async (req, res)=>{
    //     let cartId = req.params.cid;
    //     let productId = req.params.pid;
    //     res.send (await carts.addProductInCart(cartId, productId));
    // });
    