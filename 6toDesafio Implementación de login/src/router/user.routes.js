import { Router } from "express";
import { userModel } from "../models/users.model.js";

const userRouter = Router();

userRouter.get('/', async (req, res) => { 
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send('Error al consultar usuario: ', e);        
    };
 });

 userRouter.post('/static/signin', async (req, res) => { 
     const { first_name, last_name, age, password, email} = req.body;

    try {
        const resultado = await userModel.create({
            first_name, last_name, age, password, email
        });
        res.status(200).send({mensaje:"Usuario creado", respuesta: resultado });
        console.log(resultado)
    } catch (e) {
        res.status(400).send('Error al crear usuario: ', e);          
    };
  });

  export default userRouter;