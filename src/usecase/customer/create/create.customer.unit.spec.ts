import CreateCustomerUseCase from "./create.customer.usecase";

const input = {    
    name: "John Doe",
    address: {
        street: "Street",                
        number: 123,
        zip: "12345678",
        city: "city",
    }
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit test to create customer use case", () => {
    it("should create a customer", async() => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input);
        
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,           
            },
        });
    });

    it("should thrown an error when name is missing", async() => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        input.name = "";        

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
            "name is required"
        );     
    });

    it("should thrown an error when street name is missing", async() => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        input.address.street = "";        

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
            "Street is required"
        );     
    });
});