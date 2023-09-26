import local from "passport-local"; //estrategia elegida
import passport from "passport"; //handler de estrategia
import { createHash, validatePassword } from "../utils/bcrypt";
import { userModel } from "../models/users.model";


 //Defino estrategia (los mensajes de error se manejan en la ruta, aca se ven los msj html )
 const LocalStrategy = local.Strategy;
 const initializePassport = () => {
    //register del usuario
    passport.use('register', new LocalStrategy(
         {passReqToCallback: true, usernameField:'email'}, async (req, username, passport, done) => {
            //defino como registrar un usuario
            const {first_name, last_name, email, age} = req.body;
            try {
               const user = await userModel.findOne({ email: email});
               if (user) {
                  return done(null, false); //atributo se le pasa el error, y despues true, false o el usuario 
               }
               //si no esta creado, se crea el usuario
               const hashPasword = createHash(password);
               const userCreated = await userModel.create({
               first_name, last_name, age, password: hashPasword, email
               });
               console.log(userCreated);
               return done (null, userCreated);
            } catch (error) {
               return done (error);//aca le paso el error en el 1er parametro
            }
         }
    ));
   //Inicializamos la session del user
   passport.serializeUser((user, done) => {
      done(null, user._id);
   });
   //logout session
   passport.deserializeUser(async (id, done)=>{
      const user = await userModel.findById(id);
      done (null, user);
   });
 };