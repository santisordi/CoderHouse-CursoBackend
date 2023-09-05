import { Schema, model } from "mongoose";


const cartScehma = new Schema({
        products:[{
            id_prod: {
                type: Schema.Types.ObjectId, // Es un id autogerado por MongoDB
                ref: 'products',
                require:true
            },
            quantity:{
                type: Number, 
                require: true //si no agrega la cantidad tengo que agregar default: 1
            }
        }]
});

const cartModel = model ('carts', cartScehma);
export default cartModel;