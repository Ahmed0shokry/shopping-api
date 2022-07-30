import supertest from 'supertest'
import app from '../index'
import { User } from '../models/user'
import {Product} from '../models/product'

const request = supertest(app)

describe('test product endpoints', () => {
    const user: User = {
        id: 1,
        firstname: 'Hossam',
        lastname: 'Abubakr',
        password: '123456'
    }
    const product: Product = {
        name: 'product test',
        price: 1010
    };
    let token = '';

    beforeAll(async () => {
        await request
            .post('/users/login')
            .send(user)
            .then((res) => {
                token = res.body.token
            })
    })


    it('returns valid product if created product successfully ', async () => {
        await request
            .post('/products')
            .set('Authorization', 'Bearer ' + token)
            .send(product)
            .expect(200)
            .then( (res)=> {
                if(res.body.name != 'product test') throw new Error('product not created');
            });
    })

    it('returns all products ', async () => {
        await request
            .get('/products')
            .send()
            .expect(200)
            .then( (res)=> {
                if( ! res.body[0]) throw new Error('no data');
            });
    })

    it('shows a product', async () => {
        await request
            .get('/products/1')
            .send()
            .expect(200)
    })


})