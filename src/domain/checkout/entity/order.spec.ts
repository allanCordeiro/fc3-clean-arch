import Order from "./order";
import OrderItem from "./order_item";


describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() =>{
            const order = new Order("", "123", [])
        }).toThrowError("Id is required");
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
            const order = new Order("ID1", "", [])
        }).toThrowError("CustomerID is required");
    });

    it("should throw error when items are empty", () => {
        expect(() => {
            const order = new Order("ID1", "123", [])
        }).toThrowError("Items are required");
    });

    it("should calculate order total", () => {
        const orderItem1 = new OrderItem("OI1", "Product 1", 100, "p1", 2);
        const orderItem2 = new OrderItem("OI2", "Product 2", 200, "p2", 2);
        const order = new Order("Order1", "123", [orderItem1]);

        expect(order.total()).toBe(200);

        const order2 = new Order("Order2", "123", [orderItem1, orderItem2]);
        expect(order2.total()).toBe(600);

    });

    it("should throw error if item quantity is less or equal 0", () => {
        expect(() => {
            const orderItem1 = new OrderItem("OI2", "Product 2", 200, "p2", 0);
            const order = new Order("Order1", "123", [orderItem1]);
        }).toThrowError("Quantity must be greater than 0");
    });
});