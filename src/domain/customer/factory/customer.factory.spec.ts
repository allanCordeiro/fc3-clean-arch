import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("customer factory unit test", () => {
    it("should create a customer", () => {
        let customer = CustomerFactory.create("John Doe");
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.Address).toBeUndefined();
    })

    it("should create a customer with an address", () => {
        const address = new Address("Address 1", 123, "12345678", "Doe City");
        let customer = CustomerFactory.createWithAddress("John Doe", address);
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.Address).toBe(address);
    })
});