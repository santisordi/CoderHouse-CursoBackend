import { Router } from "express";

const staticsRouter = Router();

staticsRouter.get('/static', (req, res) => {
    res.render('index', {
        rutaCSS: 'index',
        rutaJS: 'index',
    });
});

staticsRouter.get('/static/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { 
        rutaCSS: "realTimeProducts",
        rutaJS: "realTimeProducts"
    });    
});

staticsRouter.get('/static/chat', (req, res) => {
    res.render('chat', {
        rutaCSS: 'chat',
        rutaJS: 'chat',
    });
});

staticsRouter.get('/static/products', (req, res) => {
    res.render('products', {
        rutaCSS: 'products',
        rutaJS: 'products',
    });
});

staticsRouter.get('/static/carts/:cid', (req, res) => {
    res.render('carts', {
        rutaCSS: 'carts',
        rutaJS: 'carts',
    });
});

export default staticsRouter;
