    import { userModel } from "../models/users.model.js";
    import crypto from 'crypto';
    import { sendRecoveryEmail } from "../config/nodemailer.js";

    const userGet = async (req, res) => {
        try {
            const users = await userModel.find();
            res.status(200).send(users);
        } catch (e) {
            res.status(400).send('Error al consultar usuario: ', e);        
        };
    };

    const recoveryLinks = {};
    const userPostRecovPass = async (req, res) => {
        const { email } = req.body;
        //logica verificacion del usuario existente
        try {
            const token = crypto.randomBytes(20).toString('hex');// usamos este token y no JWT, porque es algo simple y unico
            recoveryLinks[token] = { email, timestamp: Date.now() }; // sirve para que cada verificacion sea unica
            const recoveryLink = `http://localhost:4000/api/users/reset-password/${token}`;
            console.log(recoveryLink)
            sendRecoveryEmail(email, recoveryLink);
            res.status(200).send('Correo de recuperacion enviado correctamente ')
        
        } catch (error) {
            res.status(500).send('Error al enviar correo de recuperacion: ', error);
        };
    };

    const userPostResetPass = async (req, res) =>{
        const { token }  = req.params;
        const { newPassword } = req.body;

        try {
            //verificar que el token es valido y no a expirar (1hs)
            const linkData = recoveryLinks [token];

            if (linkData & Date.now()  - linkData.timestamp <= 3600000 ) {
                const { email } = linkData;

                //Cambio de contraseña (modificar cliente)

                //Consulto si la nueva contraseña es distinta a la antigua

                delete recoveryLinks [token] ;

                res.status(200).send ('Contraseña modificada correctamente');
            } else {
                res.status(400).send('Token invalido o expirado. Pruebe nuevamente');
            };
            
        } catch (error) {
            res.status(500).send('Error al cambiar contraseña del Cliente: ', error);
        };
    };



    const usersController = { 
        userGet, 
        userPostRecovPass,
        userPostResetPass
    };

    export default usersController;