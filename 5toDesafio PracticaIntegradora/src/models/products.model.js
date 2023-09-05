import  { Schema, model } from "mongoose";

const productSchema = new Schema ({
    title: {
        String,
        require: true
    },
    price: {
        Number,
        require: true
    },
    Stock: {
        Number,
        require: true
    },
    category: {
        String,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    },
    code: {
        type: String, 
        require: true,
        unique: true
    },
    thumbnails: []
});

const productsModel = model ('products', productSchema);
export default productsModel;
