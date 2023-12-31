import { userModel } from "../models/users.model.js";
import crypto from 'crypto';
import { sendRecoveryEmail } from "../config/nodemailer.js";
import { validatePassword } from "../utils/bcrypt.js";
import { logger } from "../utils/logger.js";
import 'dotenv/config.js'
import cartModel from "../models/carts.models.js";

const userGet = async (req, res) => {   
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (error) {
        logger.error(`[ERROR] - Date: ${new Date().toLocaleTimeString()} - ${error.message}`);
        res.status(400).send('Error al consultar usuario: ', error);        
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
    
        sendRecoveryEmail(email, recoveryLink);
        res.status(200).send('Correo de recuperacion enviado correctamente ')
    
    } catch (error) {
        logger.error(`[ERROR] - Date: ${new Date().toLocaleTimeString()} - ${error.message}`);
        res.status(500).send('Error al enviar correo de recuperacion: ', error);
    };
};

const userPostResetPass = async (req, res, next) =>{
    const { token }  = req.params;
    const { newPassword } = req.body;

    try {
        //verificar que el token es valido y no a expirar (1hs)
        const linkData = recoveryLinks [token];
        if (linkData & Date.now()  - linkData.timestamp <= TOKEN_EXPIRACION ) {
            logger.error(`[ERROR] - Date: ${new Date().toLocaleTimeString()} - Expired or invalid token: ${token}`);
            return res.status(400).send('Invalid or expired token. Try again');
        }
            const { email } = linkData;
            const user = await userModel.findOne({ email });

            if (!user) {
                logger.error(`User not found: ${email}`);
                return
            }
            

            //Consulto si la nueva contraseña es distinta a la antigua
            const isSamePassword = validatePassword(newPassword, user.password);
            if (isSamePassword) {
                logger.error(`The new password cannot be the same as the current password`);
                return res.status(400).send({ error: `The new password cannot be the same as the current password` });
            }
            //Cambio de contraseña en base de datos (modificar cliente)
            user.password = createHash(newPassword)
            await user.save();
            
            delete recoveryLinks [token] ;

            logger.info(`[INFO] - Date: ${new Date().toLocaleTimeString()} - Password updated successfully for user: ${email}`);
            res.status(200).json({ message: 'Tu contraseña ha sido reestablecida' });
    } catch (error) {
        logger.error(`[ERROR] - Date: ${new Date().toLocaleTimeString()} - ${error.message}`);
        res.status(500).send(`Error al cambiar la contraseña: ${error}`);
    };
};

const deleteUserById = async (req, res) => {
    const {uid} = req.params; 
    try {
        console.log('User ID consola:', uid);
        const user = await userModel.findOneAndDelete({_id: uid});
        if (!user) {
            return res.status(404).send('User id not found');
        };
        //Deleting his/her cart;
        const cartId = user.cart;
        if (cartId) {
            await cartModel.findByIdAndDelete(cartId);
            logger.info('Associated cart successfully deleted');
        }
        return res.status(200).send('User deleted succesfully');
    } catch (error) {
        logger.error(`[ERROR] - Date: ${new Date().toLocaleTimeString()} - ${error.message}`);
        res.status(500).send({ message: `Error deleting user: ${error}` });
    };
};

const uploadFile = (req, res) => {
    console.log(req.file)
    res.status(200).send ({mesagge: 'Archivo enviado'});
};

const deleteInactiveUser = async (req, res) => {
    try {
        const users = await userModel.find ({ last_connection: { $lt: new Date(Date.now () - process.env.INACTIVE_USER_TIME)}});

        if (users.length === 0) {
            logger.warn("No se encontraron usuarios inactivos")
        };

        await Promise.all(users.map(async (user)=>{
            const { _id, email, cart } = user;
            try {
                await sendAccountDeletion(email);
                await userModel.findByIdAndDelete(_id);
                await cartModel.findByIdAndDelete(cart);
            } catch (error) {
                logger.error(`Error al procesar usuario: ${error.mesagge}`);
                return res.status(500).send({ error: `Error al procesar usuario: ${error.mesagge}` });
            }
        }));
        logger.info(`Usuarios inactivos eliminados correctamente: ${users.length}`);
        return res.status(200).send({ resultado: 'OK', message: 'Usuarios inactivos eliminados correctamente' });
    } catch (error) {
        logger.error(`Error al eliminar usuarios inactviso: ${error}`);
        return res.status(500).send({ error:`Error al eliminar usuarios inactviso: ${error}` });
    };
};


const usersController = { 
    userGet, 
    userPostRecovPass,
    userPostResetPass,
    deleteUserById,
    uploadFile,
    deleteInactiveUser
};

export default usersController;