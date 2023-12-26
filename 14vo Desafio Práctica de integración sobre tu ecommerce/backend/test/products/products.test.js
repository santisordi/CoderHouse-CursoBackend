import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import 'dotenv/config';
import { logger } from "../../src/utils/logger.js";


const expect = chai.expect;
const requester = supertest('http://localhost:3000');

await mongoose.connect(process.env.MONGO_URL)
    .then(() => logger.info('Conectado a la BDD Mongo (test mode)'))
    .catch(error => logger.error('Error al conectar a la BDD Mongo (test mode): ' + error));


let idProd;

describe ('Testing App', ()=>{
    describe('Test de productos', ()=>{
        it('Test endpoint /ap/products, se espera ue genere un producto', async function(){
            const newProduct = {    
                title: 'mate 1',
                description: 'mate calabaza',
                category: 'Calabaza',
                price: 1500,
                stock: 60,
                code: 'Mate01',
                thumbnail: []
            }
            const {_body } = await requester.post('/api/products').send(newProduct);
            logger.info(_body.ok);
            // idProd = _body.payload._id 
        });
    });
});