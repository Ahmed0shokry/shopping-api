import {User, UserModel} from '../models/user'
import express, { Request, Response } from 'express'
import {signToken, verifyToken} from '../helpers/JWT'

const index = async (req: Request, res: Response) => {
    verifyToken(req);
    try {
        const users = await (new UserModel()).index();
        return res.send(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const show = async (req: Request, res: Response) => {
    verifyToken(req);
    try {
        const id = Number(req.params.id);
        const user = await (new UserModel()).show(id);
        return res.send(user);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const create = async (req: Request, res: Response) => {
    verifyToken(req);
    try {
        const { firstname, lastname, password } = req.body;
        const user = await (new UserModel()).create( <User>({firstname: firstname, lastname: lastname, password: password}) );
        const token = signToken(user['id'] as number);
        return res.send({ ...user, token })
    } catch (error) {
        return res.status(500).json(error);
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, password } = req.body;
        const id = await (new UserModel()).login( <User>({firstname: firstname, lastname: lastname, password: password}) );
        const token = signToken(id as number);
        return res.send({ token })
    } catch (error) {
        return res.status(500).json(error);
    }
};


const usersRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.post('/users/login', login);
};

export default usersRoutes;