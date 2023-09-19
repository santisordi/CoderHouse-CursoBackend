import { Router, response } from "express";
import { userModel } from "../models/users.model.js";

const userRouter = Router();

userRouter.get('/', async (req, res) => { 
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send('Error al consultar usuario: ', error);        
    };
 });

 userRouter.post('/', async (req, res) => { 
     const { first_name, last_name, age, password, email} = req.body
    try {
        const resultado = await userModel.create({
            first_name, last_name, age, password, email
        });
        res.status(200).send({mensaje:"Usuario creado", respuesta: response });
    } catch (error) {
        res.status(400).send('Error al crear usuario: ', error);          
    };
  });

  export default userRouter;