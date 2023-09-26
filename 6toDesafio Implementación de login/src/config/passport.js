 import local from "passport-local"; //estrategia elegida
 import passport from "passport"; //handler de estrategia
 import { createHash, validatePassword } from "../utils/bcrypt";

 //Defino estrategia
 const LocalStrategy = local.Strategy;
 const initializePassport = () => {
    //register del usuario
    passport.use('register', new LocalStrategy(
         {passReqToCallback: true, usernameField:'email'}, async (req, username, passport, done) => {
            //defino como registrar un usuario
         }
    ))

 }