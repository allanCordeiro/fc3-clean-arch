import Product from "./product";

describe("Product unit tests", () => {
    //it("", () => {});
    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Product1", 100);
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("123", "", 100);
        }).toThrowError("Name is required");
    });

    it("should throw error when price is less than zero.", () => {
        expect(() => {
            const product = new Product("123", "Product1", -5);
        }).toThrowError("Price must be greater than zero");
    });

    it("should change product's name", () => {
        const product = new Product("123", "Product1", 100);
        product.changeName("Product xyz");
        expect(product.name).toBe("Product xyz");
    });

    it("should change product's price", () => {
        const product = new Product("123", "Product1", 100);
        product.changePrice(300);
        expect(product.price).toBe(300);
    });

});