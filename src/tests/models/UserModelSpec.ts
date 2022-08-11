import {User, UserModel} from '../../models/user'

const user: User = {
    firstname: 'khaled',
    lastname: 'ali',
    password: '123456'
}

describe('test user model', () => {

    it('return user if it created successfully', async () => {
        const newUser = await (new UserModel()).create(user);
        expect(newUser.firstname).toEqual(user.firstname);
    });


    it('returns all users', async () => {
        await (new UserModel()).create(user);
        const users = await (new UserModel()).index();
        expect(users.length).toBeGreaterThan(0);
    });


    it('return a specific user to show ', async () => {
        const newUser = await (new UserModel()).create(user);
        const userToShow = await (new UserModel()).show(newUser.id as number);
        expect(userToShow.id).toEqual(newUser.id);
    });

    it('returns all users', async () => {
        await (new UserModel()).create(user);
        const users = await (new UserModel()).index();
        expect(users.length).toBeGreaterThan(0);
    });

    it('returns a user id if he logged in successfully', async () => {
        const user: User = {
            firstname: 'firstname' +  (Math.floor(Math.random()*(100-10+1)+10)), //random name
            lastname: 'lastname',
            password: '123456'
        }
        const newUser = await (new UserModel()).create(user);
        newUser['password'] = '123456';
        const userId = await (new UserModel()).login(newUser);
        console.log({newUser: newUser.id, userId:userId})
        expect(userId).toEqual(newUser.id as number);
    });



})