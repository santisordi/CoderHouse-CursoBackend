import { Router } from "express";
import { userModel } from "../models/users.model.js";
import passport from "passport";


const userRouter = Router();
//Ruta para obtener usuarios
userRouter.get('/', async (req, res) => { 
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send('Error al consultar usuario: ', e);        
    };
 });
//Ruta para crear usuarios con passport
 userRouter.post('/',passport.authenticate('register'), async (req, res) => { 
    try {
        if (!req.user) {
            return res.status(400).send({mensaje:`Usuario ya existente`});
        }
        return res.status(200).send({mensaje: "Usuario Creado"});
    } catch (error) {
        res.status(500).send({mensaje: `Error al crear usuario ${error}`});
    };
  });
  
export default userRouter;

// import { createHash  } from "../utils/bcrypt.js";
//   const { first_name, last_name, age, password, email} = req.body;

//   try {
//       const hashPasword = createHash(password) //introduzco el bcrypt 
//       const resultado = await userModel.create({
//           first_name, last_name, age, password: hashPasword, email
//       });
//       res.status(200).send({mensaje:"Usuario creado", respuesta: resultado });
      
//   } catch (error) {
//       res.status(400).send({error: `Error al crear usuario: ${error}` });          
//   };