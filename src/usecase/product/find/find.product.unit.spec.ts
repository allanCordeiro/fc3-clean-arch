import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

describe("Product find usecase unit tests", () => {
    const product = new Product("123", "Product", 123.50);

    const MockRepository = () => {
        return {
            create: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(product)),
            findAll: jest.fn(),
            update: jest.fn()
        }
    };
    it("should get a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Product",
            price: 123.50
        };

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it("should get an exception product not found", () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "not_a_product"
        }

        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow("product not found");
    });
});