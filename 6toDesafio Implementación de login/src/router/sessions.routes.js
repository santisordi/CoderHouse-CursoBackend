import { Router } from "express";
import { userModel } from "../models/users.model.js";

<<<<<<< HEAD
=======

>>>>>>> 2e28c29ff0795088175e489d2a03942019ca995a
const sessionRouter = Router();
 
sessionRouter.post('/login', async (req,res)=>{
    const {email, password}= req.body;

    try {
        if(req.session.login)
<<<<<<< HEAD
            res.status(200).send({resultado: 'Login ya existente'});

        const user = await userModel.findOne({ email: email }) // uso para que devuelva un solo elemento el findOne

        if(user){
            if(user.password == password){
                req.session.login = true; //session activa
                res.status(200).send({resultado: 'Login valido', message: user });
            } else{
                res.status(401).send({resultado: 'Unathorized', message: user });
=======
            res.status(200).send({resultado: 'Login ya existente', message: user });

        const user = await userModel.findOne({email: email})

        if(user){
            if(user.password === password){
                req.session.login = true; //session activa
            } else{
                res.status(200).send({resultado: 'Login valido', message: user });
>>>>>>> 2e28c29ff0795088175e489d2a03942019ca995a
            };
        } else {
            res.status(404).send({resultado: 'Not Found', message: user });
        };
<<<<<<< HEAD
    } catch (error) {
        res.status(400).send({error: `Error en login: ${error}`});     
=======
    } catch (e) {
        res.status(400).send({error: `Error en login: ${e}`});     
>>>>>>> 2e28c29ff0795088175e489d2a03942019ca995a
    };
});

sessionRouter.get('/logout', (req,res)=>{
    if(req.session.login){
        req.session.destroy();
<<<<<<< HEAD
    } 
    res.status(200).send ({resyltado: 'Login Eliminado'});
=======
    } res.status(200).send ({resyltado: 'Login Eliminado'});
>>>>>>> 2e28c29ff0795088175e489d2a03942019ca995a
});

export default sessionRouter;