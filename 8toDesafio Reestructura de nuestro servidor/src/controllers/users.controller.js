import { userModel } from "../models/users.model.js";

export const userGet = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send('Error al consultar usuario: ', e);        
    };
};

export const userPost = async (req,res) => {
    try {
        if (!req.user) {
            return res.status(400).send({mensaje:`Usuario ya existente`});
        }
        return res.status(200).send({mensaje: "Usuario Creado"});
    } catch (error) {
        res.status(500).send({mensaje: `Error al crear usuario ${error}`});
    };
}

const usersController = { getUser, postUser };

export default usersController;