import supertest from 'supertest'
import app from '../index'
import {User, UserModel} from '../models/user'
import {Order, OrderModel} from '../models/order'
import client from "../database";

const request = supertest(app)

describe('test product endpoints', () => {
    const user: User = {
        id: 1,
        firstname: 'tamer',
        lastname: 'magdi',
        password: '123456'
    }
    const order: Order = {
        status: 1,
        user_id: user.id as number
    };
    let token = '';

    beforeAll(async () => {
        await (new UserModel()).create(user);
        await request
            .post('/users/login')
            .send(user)
            .then((res) => {
                token = res.body.token
            })
    })


    it('returns valid order if created order successfully ', async () => {
        await request
            .post('/orders')
            .set('Authorization', 'Bearer ' + token)
            .send(order)
            .expect(200)
    })

    it('returns all orders for specific user', async () => {
        await (new OrderModel()).create(order);
        await request
            .get('/orders?user_id=' + user.id)
            .set('Authorization', 'Bearer ' + token)
            .send()
            .expect(200)
            .then( (res)=> {
                if( ! res.body[0]) throw new Error('no data');
            });
    })

    it('shows an order', async () => {
        await request
            .get('/orders/1')
            .set('Authorization', 'Bearer ' + token)
            .send()
            .expect(200)
    })

    afterAll(async () => {
        const dbCon = await client.connect()
        await dbCon.query('truncate table users cascade;')
        await dbCon.query('alter sequence users_id_seq RESTART WITH 1')
        await dbCon.release()
    })
})