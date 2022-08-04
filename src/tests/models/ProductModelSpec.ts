import {Product, ProductModel} from '../../models/product'

const product: Product = {
    name: 'product for test',
    price: 1111
};

describe('test product model', () => {

    it('return product if it created successfully', async () => {
        const newProduct = await (new ProductModel()).create(product);
        expect(newProduct.name).toEqual(product.name);
    });


    it('returns all products', async () => {
        await (new ProductModel()).create(product);
        const products = await (new ProductModel()).index();
        expect(products.length).toBeGreaterThan(0);
    });


    it('return a specific product to show ', async () => {
        const newProduct = await (new ProductModel()).create(product);
        const productToShow = await (new ProductModel()).show(newProduct.id as number);
        expect(productToShow.id).toEqual(newProduct.id);
    });



});