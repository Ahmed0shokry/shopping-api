import supertest from 'supertest'
import app from '../index'
import {User, UserModel} from '../models/user'
import client from "../database";


const request = supertest(app)

describe('test user endpoints', () => {
    // const user1: User = {
    //     id: 1,
    //     firstname: 'Hossam',
    //     lastname: 'Abubakr',
    //     password: '123456'
    // }
    const user2: User = {
        firstname: 'ahmed2',
        lastname: 'shokry2',
        password: '123456'
    }
    let user3: User = {
        id: 1,
        firstname: 'Mohammed',
        lastname: 'Elzanaty',
        password: '123456'
    }
    let token = '';

    beforeAll(async () => {
        user3.id = (await (new UserModel()).create(user3)).id;
        await request
            .post('/users/login')
            .send(user3)
            .then((res) => {
                token = res.body.token
            })
    })


    it('login a user', async () => {
        await request.post('/users/login').send(user3).expect(200)
    })


    it('returns valid token and user data if created users successfully ', async () => {
        await request
            .post('/users')
            .send(user2)
            .expect(200)
            .then( (res)=> {
                if(res.body.firstname != "ahmed2") throw new Error('user data not found');
                if( ! (res.body.token as string) ) throw new Error('token not found');
            });
    })

    it('returns all users ', async () => {
        await request
            .get('/users')
            .set('Authorization', 'Bearer ' + token)
            .send()
            .expect(200)
            .then( (res)=> {
                //console.log({myData: res.body})
                if( ! res.body[0]) throw new Error('no data');
            });
    })

    it('shows a user with valid data', async () => {
        await request
            .get('/users/' + user3.id)
            .set('Authorization', 'Bearer ' + token)
            .send()
            .expect(200)
    })


})