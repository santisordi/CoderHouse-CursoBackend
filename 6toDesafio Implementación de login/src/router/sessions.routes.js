import { Router } from "express";
import { userModel } from "../models/users.model";


const routerSession = Router();
 
routerSession.post('login', async (req,res)=>{
    const {email, password}= req.body;

    try {
        if(req.session.login)
            res.status(200).send({resultado: 'Login ya existente', message: user });

        const user = await userModel.findOne({email: email})

        if(user){
            if(user.password === password){
                req.session.login = true; //session activa
            } else{
                res.status(200).send({resultado: 'Login valido', message: user });
            };
        } else {
            res.status(404).send({resultado: 'Not Found', message: user });
        };
    } catch (e) {
        res.status(400).send({error: `Error en login: ${e}`});     
    };
});

routerSession.get('logout', (req,res)=>{
    if(req.session.login){
        req.session.destroy();
    } res.status(200).send ({resyltado: 'Login Eliminado'});
});

export default routerSession;