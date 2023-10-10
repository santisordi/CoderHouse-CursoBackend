 import jwt  from "jsonwebtoken";
 import 'dotenv/config';

 export const generateToken = (user) => {
    /*
        1 parametro: objeto saociado al token
        2do: clave privada para el cifrado
        3ro tiempo de expiracion
    */
    const token = jwt.sign({user}, "coderhouse123", {expiresIn:'12h' });
    return token;
};

console.log(generateToken({"_id":"6525306ab7dda62e3d7fd3ed","first_name":"hola","last_name":"como","age":{"$numberInt":"21"},"email":"santi@asda.com","password":"123" }))

//Compruebo autenticación
export const authToken = (req, res, next) => {
    //consulto el header
    const authHeader=req.headers.authorization // consulto si existe el token
    if (!authHeader){
        return res.status(401).send({error: 'Usuario no autenticado'})
    };

    const token = authHeader.split(' ')[1]; //sweparo en dos el token bearer y token. y me quedo con la parte valida
//evito accesos no deseados a mi Bdd
    jwt.sign(token, process.env.JWT_SECRET, (error, credentials) => {
        if(error) {
            return res.status(403).send({ error: 'Usuario no autorizado' })
        };
        //desifro el token
        req.user = credentials.user;
        next()
    });

};
 