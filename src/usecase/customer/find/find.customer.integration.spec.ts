import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("test find customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async() => {        
        const customer = new Customer("123", "John Doe");
        const address = new Address("Street", 123, "12345678", "city");
        customer.changeAddress(address);
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);
        await customerRepository.create(customer);

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "John Doe",
            address: {
                street: "Street",                
                number: 123,
                zip: "12345678",
                city: "city",
            }
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

});