import {Product, ProductModel} from '../models/product';
import express, { Request, Response } from 'express';


const index = async (req: Request, res: Response) => {
    try {
        const products = await (new ProductModel()).index();
        return res.send(products);
    } catch (error) {
        res.status(500).json(error);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const product = await (new ProductModel()).show(id);
        return res.send(product);
    } catch (error) {
        res.status(500).json(error);
    }
};

const create = async (req: Request, res: Response) => {

    try {
        const { name, price } = req.body;
        const product = await (new ProductModel()).create( <Product>({name: name, price: price}) );
        return res.send(product);
    } catch (error) {
        res.status(500).json(error);
    }
};


const productsRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
};

export default productsRoutes;