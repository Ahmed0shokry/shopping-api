import {User, UserModel} from '../models/user'
import express, { Request, Response } from 'express'

const index = async (req: Request, res: Response) => {
    try {
        const users = await (new UserModel()).index();
        return res.send(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = await (new UserModel()).show(id);
        return res.send(user);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, password } = req.body;
        const user = await (new UserModel()).create( <User>({firstName: firstName, lastName: lastName, password: password}) );
        return res.send(user);
    } catch (error) {
        return res.status(500).json(error);
    }
};


const usersRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
};

export default usersRoutes;