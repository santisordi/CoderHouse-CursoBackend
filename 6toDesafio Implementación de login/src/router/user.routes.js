import { Router, response } from "express";
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

 userRouter.post('/', async (req, res) => { 
<<<<<<< HEAD
     const { first_name, last_name, age, password, email} = req.body;
=======
     const { first_name, last_name, age, password, email} = req.body
>>>>>>> 2e28c29ff0795088175e489d2a03942019ca995a
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