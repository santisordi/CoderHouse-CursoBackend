import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol:{
        type:String,
        default:'user'
    },
    age: {
        type: Number,
        required: true,
    },
    cart: {
        type: Schema.Types.ObjectId, 
            ref: 'carts'
    }
});

export const userModel = model('users', userSchema);
