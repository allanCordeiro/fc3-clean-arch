import Product from "../../../domain/product/entity/product";
import { ListProductUseCase } from "./list.product.usecase";

describe("product list use case unit tests", () => {
    const productOne = new Product("123", "Product 123", 156.20);
    const productTwo = new Product("456", "Product 456", 77.88);

    const MockRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([productOne, productTwo])),
        }
    };

    it("should show a product list", async () => {
        const productRepository = MockRepository();
        const usecase = new ListProductUseCase(productRepository);
        
        const output = await usecase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe("123");
        expect(output.products[0].name).toBe("Product 123");
        expect(output.products[0].price).toBe(156.20);
        expect(output.products[1].id).toBe("456");
        expect(output.products[1].name).toBe("Product 456");
        expect(output.products[1].price).toBe(77.88);
    });
});