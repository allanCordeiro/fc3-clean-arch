import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    
    it("should throw error when customer's id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John Doe");
        }).toThrowError("id is required") ;
    });

    it("should throw error when customer's name is empty", () => {
        expect(() => {
            let customer = new Customer("ID1", "");
        }).toThrowError("name is required");
    });

    it("should activate a customer when receives an address", () => {
        let customer = new Customer("ID1", "John Doe");
        let address = new Address("Dom Jaime Avenue", 555, "03233-033", "Itaquera");
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate a customer", () => {
        let customer = new Customer("ID1", "John Doe");
        let address = new Address("Dom Jaime Avenue", 555, "03233-033", "Itaquera");
        customer.Address = address;
        customer.activate();

        expect(customer.isActive()).toBe(true);

        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

    it("should throw an error when tries to activate a customer without an address", () => {
        let customer = new Customer("ID1", "John Doe");
        expect(() => {
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });

    it("should change the customer's name", () => {
        let customer = new Customer("ID1", "John Doe");
        customer.changeName("Jane Doe");
        
        expect(customer.name).toBe("Jane Doe");
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "John Doe");
        expect(customer.rewardPoints).toBe(0);
        
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });

});