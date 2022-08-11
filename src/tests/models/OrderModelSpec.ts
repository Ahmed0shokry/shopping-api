import {Order, OrderModel} from '../../models/order'
import {User, UserModel} from '../../models/user'

const user: User = {
    id: 1,
    firstname: 'said',
    lastname: 'ali',
    password: '123456'
}
const order: Order = {
    status: 1,
    user_id: user.id as number
};


describe('test order model', () => {

    beforeAll(async ()=>{
        user.id =  (await (new UserModel()).create(user)).id;
    })

    it('return order if it created successfully', async () => {
        const newOrder = await (new OrderModel()).create(order);
        expect(newOrder.status).toEqual(order.status);
    });


    it('returns all orders', async () => {
        await (new OrderModel()).create(order);
        const orders = await (new OrderModel()).index(order.user_id);
        expect(orders.length).toBeGreaterThan(0);
    });


    it('return a specific order to show ', async () => {
        const newOrder = await (new OrderModel()).create(order);
        const orderToShow = await (new OrderModel()).show(newOrder.id as number);
        expect(orderToShow.id).toEqual(newOrder.id);
    });



})