import chai from "chai";
import supertest from "supertest";
import Assert from 'assert'
import mongoose from "mongoose";
import 'dotenv/config';
import { logger } from "../../src/utils/logger.js";
import productsModel from "../../src/models/products.model.js";


// const expect = chai.expect;
// const requester = supertest('http://localhost:3000');

// await mongoose.connect(process.env.MONGO_URL)
//     .then(() => logger.info('Conectado a la BDD Mongo (test mode)'))
//     .catch(error => logger.error('Error al conectar a la BDD Mongo (test mode): ' + error));


// let idProd;

// describe ('Testing App', ()=>{
//     describe('Test de productos', ()=>{
//         it('Test endpoint /ap/products, se espera ue genere un producto', async function(){
//             const newProduct = {    
//                 title: 'mate 1',
//                 description: 'mate calabaza',
//                 category: 'Calabaza',
//                 price: 1500,
//                 stock: 60,
//                 code: 'Mate01',
//                 thumbnail: []
//             }
//             const {_body } = await requester.post('/api/products').send(newProduct);
//             logger.info(_body);
//             // idProd = _body.payload._id 
//         });
//     });
// });

await mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
        logger.info("MongoDB connected");
    })
    .catch((error) => console.log(`Error connecting to MongoDB Atlas: ${error}`));

const assert = Assert.strict

describe('Testing Products', () => {
    beforeEach(function () {
        this.timeout(7000)
    })

    let id

    it('Create new product', async function () {
        const newProduct = {
            title: 'Test product',
            description: 'This is a test product',
            category: 'Testing',
            price: 10,
            stock: 500,
            code: 'test123',
        }
        const resultado = await productsModel.create(newProduct)
        id = resultado._id
        assert.ok(resultado._id)
    })

    it('Get product by id', async function () {
        const product = await productsModel.findById(id)
        assert.strictEqual(typeof product, 'object')
    })

    it('Delete product by id', async function () {
        const product = await productsModel.findByIdAndRemove(id)
        assert.strictEqual(typeof product, 'object')
    })

    it('Get all products', async function () {
        const products = await productsModel.find()
        assert.strictEqual(Array.isArray(products), true)
    })
})