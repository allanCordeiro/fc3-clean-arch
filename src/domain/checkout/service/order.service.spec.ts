import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
    it("should get total of all orders", () => {
        const item1 = new OrderItem("oi1", "item 1", 100, "p1", 1);
        const item2 = new OrderItem("oi2", "item 2", 200, "p2", 2);

        const order = new Order("o1", "123", [item1]);
        const order2 = new Order("o2", "123", [item2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(500);
    });

    it("should place an order", () => {
        const customer = new Customer("c1", "John Doe");
        const orderItem1 = new OrderItem("item1", "Item 1", 10, "p1", 1);
        const order = OrderService.placeOrder(customer, [orderItem1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);

    });
});