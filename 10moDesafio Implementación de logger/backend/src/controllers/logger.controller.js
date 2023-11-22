import { logger } from "../utils/logger.js";

export const getLog = (req, res) => {
    logger.info('mi primer log')
    try {
        throw new Error ('test error');
    } catch (error) {
        logger.info(`Ha ocurrido un error ${error.message}`);
        res.status(500).send({message: 'Internal server error'});
    }
    res.status(200).send('GET request to the main');
};

export const postLog = (req, res)=> {
    res.status(201).send('POST request to the main');
};