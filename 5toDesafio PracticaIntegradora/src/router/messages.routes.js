import { Router } from "express";
import messageModel from "../models/messages.models";

const routerMessage = Router();

routerMessage.get('/', async (req, res)=>{
    try {   
        const messages = await messageModel.find();
        res.status(200).send({ resultado: 'OK', message: messages});
    } catch (error) {
        res.status(400).send({ resultado: 'Error al consultar mensaje', message: messages});  
    }
});

routerMessage.post('/', async (req, res)=>{
    const { email, message} = req.body;
    try {   
        const messages = await messageModel.create();
        res.status(200).send({ resultado: 'OK', message: messages});
    } catch (error) {
        res.status(400).send({ resultado: 'Error al consultar mensaje', message: messages});  
    }
});


export default routerMessage;

