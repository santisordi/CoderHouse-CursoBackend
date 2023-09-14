import { Router } from 'express';
import cartModel from '../models/carts.models.js';
import productsModel from '../models/products.model.js';

const cartRouter = Router();
//Get Carts
cartRouter.get('/', async (req, res) => {
    const {limit}    = req.query
    try{
        const carts = await cartModel.find().limit(limit);
        res.status(200).send({ resultado: 'OK', message: carts });

    }catch (error) {
        res.status(400).send({error: `Error al consultar carrito: ${error}`})
    }
} );
//Get cart by id
cartRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try{
        const cart = await cartModel.findById(cid);
        cart 
            ? res.status(200).send({resultado: 'OK', messag:cart})
            : res.status(404).send({resultado:'Not Found', message: cart})

    }catch (error){
        res.status(400).send ({ error:`Error al consultar carritos: ${error}`});
    }
});
// Create Carts
cartRouter.post('/', async (req, res)=> {
    const respuesta = await cartModel.create(req.body);
    try{
        res.status(200).send({ resultado: 'OK', message: respuesta });
        
    } catch(error){
        res.status(400).send ({ error:`Error al crear carritos: ${error}`});
    }
});

//add product to cart (ok!)
cartRouter.post('/:cid/products/:pid', async (req, res)=>{ //esta ok
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        // Verfico si el carrito existe
        const cartExists = await cart.findById(cid);
        !cartExists ? res.status(404).send({ resultado: 'Cart not found'}) : ""
        
        //verifico si existe el producto
        const prodExists = cart.products.find(prod => prod.id_prod == cid);
        // Si el producto ya existe, actualiza la cantidad
        prodExists ? prodExists.quantity += quantity
                    // Si el producto no existe, agrega uno nuevo al carrito
                    : cart.products.push({ id_prod: pid, quantity });

        // Guarda el carrito actualizado en la base de datos
        await cart.save();
			res.status(200).send({ resultado: 'OK', message: cart });
        } catch (error) {
            res.status(400).send({ error:error });
        };
    });

//update cart by id
cartRouter.put('/:cid', async (req, res) => {
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


//Empty cart 
cartRouter.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    try{
        const cart = await cartModel.findByIdAndDelete(cid);
        cart ? res.status(200).send({resultado: 'OK', messag:cart})
        : res.status(404).send({resultado:'Not Found', message: cart})
    } catch (error){
        res.status(400).send ({ error:`Error al eliminar carritos: ${error}`});

    }
});

// delect product from cart 
cartRouter.delete('/:cid/products/:pid', async (req,res) =>{
    const {cid, pid} = req.params;
    try {
        const cart = await cartModel.findById(cid);
        
        
    } catch (error) {
        
    }
})

export default cartRouter;
    
