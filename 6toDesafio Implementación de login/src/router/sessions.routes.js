import { Router } from "express";
import { userModel } from "../models/users.model.js";

const sessionRouter = Router();
 
sessionRouter.post('/login', async (req,res)=>{
    const {email, password}= req.body;

    try {
        if(req.session.login)
            res.status(200).send({resultado: 'Login ya existente'});

        const user = await userModel.findOne({ email: email }) // uso para que devuelva un solo elemento el findOne

        if(user){
            if(user.password == password){
                req.session.login = true; //session activa
                res.status(200).send({resultado: 'Login valido', message: user });
            } else{
                res.status(401).send({resultado: 'Unathorized', message: user });
            };
        } else {
            res.status(404).send({resultado: 'Not Found', message: user });
        };
    } catch (error) {
        res.status(400).send({error: `Error en login: ${error}`});     
    };
});

sessionRouter.get('/logout', (req,res)=>{
    if(req.session.login){
        req.session.destroy();
    } 
    res.status(200).send ({resyltado: 'Login Eliminado'});
});

export default sessionRouter;