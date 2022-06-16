import Product from "../../../domain/product/entity/product";
import { UpdateProductUseCase } from "./update.product.usecase";

describe("update product use case unit tests", () => {
    const product = new Product("123", "Product A", 123.4);
    const MockRepository = () => {
        return {
            create: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(product)),
            findAll: jest.fn(),
            update: jest.fn()
        }        
    }    

    it("should update a product", async () => {
        const productRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        const input = {
            id: "123",
            name: "Product 123",
            price: 666.0
        }

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    });
    
});