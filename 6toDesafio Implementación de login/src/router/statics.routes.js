import { Router } from "express";
import productsModel from "../models/products.model.js";

const staticsRouter = Router();

staticsRouter.get('/', (req, res) => {
    res.render('products', {
        rutaCSS: 'products',
        rutaJS: 'products',
    });
});

staticsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { 
        rutaCSS: "realTimeProducts",
        rutaJS: "realTimeProducts"
    });    
});

staticsRouter.get('/chat', (req, res) => {
    res.render('chat', {
        rutaCSS: 'chat',
        rutaJS: 'chat',
    });
});

staticsRouter.get('/products', async (req, res) => {
    try {
        // Aquí debes obtener los datos de productos desde tu base de datos
        const products = await productsModel.find();

        res.render('products', {
            rutaCSS: 'products',
            rutaJS: 'products',
            products: products, // Pasa los datos de productos a la vista
        });
    } catch (error) {
        console.error('Error al obtener datos de productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

staticsRouter.get('/carts/:cid', (req, res) => {
    res.render('carts', {
        rutaCSS: 'carts',
        rutaJS: 'carts',
    });
});

staticsRouter.get('/login', (req, res) => {
    res.render('login', {
        rutaCSS: 'login',
        rutaJS: 'login',
    });
});

staticsRouter.get('/signin', (req, res) => {
    res.render('signin', {
        rutaCSS: 'signin',
        rutaJS: 'signin',
    });
});

staticsRouter.get('/profile', (req, res) => {
    res.render('profile', {
        rutaCSS: 'profile',
        rutaJS: 'profile',
    });
});

staticsRouter.get('/home', (req, res) => {
    res.render('home', {
        rutaCSS: 'home',
        rutaJS: 'home',
    });
});

export default staticsRouter;
