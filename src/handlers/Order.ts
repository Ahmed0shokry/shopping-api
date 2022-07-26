import {Order, OrderModel} from '../models/order'
import express, { Request, Response } from 'express'

const index = async (req: Request, res: Response) => {
    try {
        const orders = await (new OrderModel()).index();
        res.send(orders);
    } catch (error) {
        res.status(500).json(error);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const order = await (new OrderModel()).show(id);
        res.send(order);
    } catch (error) {
        res.status(500).json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const { status, user_id } = req.body;
        const order = await (new OrderModel()).create( <Order>({status: status, user_id: user_id}) );
        res.send(order);
    } catch (error) {
        res.status(500).json(error);
    }
};


const usersRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
};

export default usersRoutes;