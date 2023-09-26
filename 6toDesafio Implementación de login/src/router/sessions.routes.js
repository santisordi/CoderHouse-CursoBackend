import { Router } from "express";
import passport from "passport";
import { validatePassword } from "../utils/bcrypt.js";
// import { userModel } from "../models/users.model.js";

const sessionRouter = Router();
 //Ruta para crear el login del usuario con passport
sessionRouter.post('/login', passport.authenticate('login'), (req, res) => {
  try {
    if (!req.user) {
        res.status(401).send({mensaje: "Invalidate Password"});
    } //creo la session
    req.session.user = {
        first_name : req.user.first_name,
        last_name : req.user.last_name,
        age: req.user.age,
        email: req.user.email
    };
    res.status(200).send ({payload: req.user });
  } catch (error) {
    res.status(500).send({mensaje: `Error al inicializar sesion ${error}`});
  };
});

sessionRouter.get('/logout', (req, res) => {
    if (req.session.login) {
        req.session.destroy()
    }
    res.status(200).send({ resultado: 'Login eliminado' })
})

export default sessionRouter;

// const { email, password } = req.body

// try {
//     if (req.session.login)
//         res.status(400).send({ resultado: 'Login ya existente' })
        
//         const user = await userModel.findOne({ email: email })

//     if (user) {
//         if (validatePassword(password, user.password)) {
//             req.session.login = true;
//             req.session.email = user.email;
//             res.status(200).send({ resultado: 'Login valido', message: user })
//             //res.redirect('ruta', 200, {'info': user}) Redireccion
//         } else {
//             res.status(401).send({ resultado: 'Unauthorized', message: user })
//         }
//     } else {
//         res.status(404).send({ resultado: 'Not Found', message: user })
//     }
// } catch (error) {
//     res.status(400).send({ error: `Error en login: ${error}` })
// }