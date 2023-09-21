import { Router } from "express";

const staticsRouter = Router();

staticsRouter.get('/', (req, res) => {
    res.render('index', {
        rutaCSS: 'index',
        rutaJS: 'index',
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

staticsRouter.get('/products', (req, res) => {
    res.render('products', {
        rutaCSS: 'products',
        rutaJS: 'products',
    });
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

export default staticsRouter;
