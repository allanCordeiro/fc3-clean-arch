import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { UpdateProductUseCase } from "./update.product.usecase";

let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


describe("update product use case unit tests", () => {
    const product = new Product("123", "Product A", 123.4);

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        await productRepository.create(product);
        
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