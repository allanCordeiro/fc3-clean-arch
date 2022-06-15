import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository unit tests", () => {
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


    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("John Doe Av", 123, "12345-678", "John Doe City");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerFound = await CustomerModel.findOne({ where : {id: "123"}});
        expect(customerFound.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("John Doe Av", 123, "12345-678", "John Doe City");
        customer.Address = address;
        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        await customerRepository.update(customer);

        const customerFound = await CustomerModel.findOne({ where : {id: "123"}});
        expect(customerFound.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("John Doe Av", 123, "12345-678", "John Doe City");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerFound = await customerRepository.find(customer.id);
        expect(customerFound).toStrictEqual(customer);
    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();
        
        expect(async () => {
            await customerRepository.find("ola123");
        }).rejects.toThrow("Customer not found");
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("123", "Customer 1");
        const address = new Address("John Doe Av", 123, "12345-678", "John Doe City");
        customer1.Address = address;
        customer1.addRewardPoints(10);
        customer1.activate();

        
        const customer2 = new Customer("456", "Customer 2");
        const address2 = new Address("Jame Doe Av", 23, "12345-690", "John Doe City");
        customer2.Address = address2;
        customer2.addRewardPoints(5);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);


        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
    });

});