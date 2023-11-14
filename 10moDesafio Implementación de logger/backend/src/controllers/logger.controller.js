import { logger } from "../utils/logger.js";

export const getLog = (req, res) => {
    logger.info('mi primer log')
    res.status(200).send('GET request to the main');
};

export const postLog = (req, res)=> {
    res.status(201).send('POST request to the main');
};