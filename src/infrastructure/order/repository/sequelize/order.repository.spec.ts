import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John Doe");
        const address = new Address("John Doe Street", 123, "123456-789", "John Doe City");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("P1", "Product 1", 10);
        const product2 = new Product("P2", "Product 2", 20);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem(
            "OI1", 
            product1.name,
            product1.price,
            product1.id,
            1
        );

        const orderItem2 = new OrderItem(
            "OI2", 
            product2.name,
            product2.price,
            product2.id,
            2
        );

        const order = new Order("O1", customer.id, [orderItem1, orderItem2]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem1.id,
                    name: orderItem1.name,
                    price: orderItem1.price,
                    quantity: orderItem1.quantity,
                    order_id: order.id,
                    product_id: product1.id,
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: order.id,
                    product_id: product2.id,
                },

            ]
        });

    });
    
    it("should update and order", async () => {
        expect(1).toBe(1);
    });

    it("should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John Doe");
        const address = new Address("John Doe Street", 123, "123456-789", "John Doe City");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("P1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "OI1", 
            product.name,
            product.price,
            product.id,
            2
        );


        const order = new Order("O1", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        
        const orderFound = await orderRepository.find(order.id);        
        expect(orderFound).toStrictEqual(order);
    });

    it("should throw error when order wasnt found", async () => {
        const orderRepository = new OrderRepository();

        expect(async () => {
            await orderRepository.find("123XYZ")
        }).rejects.toThrowError("Order not found");
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John Doe");
        const address = new Address("John Doe Street", 123, "123456-789", "John Doe City");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("P1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem1 = new OrderItem(
            "OI1", 
            product.name,
            product.price,
            product.id,
            2
        );

        const orderItem2 = new OrderItem(
            "OI2", 
            product.name,
            product.price,
            product.id,
            2
        );

        const orderItem3 = new OrderItem(
            "OI3", 
            product.name,
            product.price,
            product.id,
            2
        );


        const order1 = new Order("O1", customer.id, [orderItem1]);        
        const order2 = new Order("O2", customer.id, [orderItem2]);
        const order3 = new Order("O3", customer.id, [orderItem3]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);
        await orderRepository.create(order3);

        const orders = await orderRepository.findAll();
        expect(orders).toHaveLength(3);
        expect(orders).toContainEqual(order1);
        expect(orders).toContainEqual(order2);
        expect(orders).toContainEqual(order3);
    });

    it("should update an order item data", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John Doe");
        const address = new Address("John Doe Street", 123, "123456-789", "John Doe City");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("P1", "Product 1", 10);
        await productRepository.create(product);
        

        const orderItem = new OrderItem(
            "OI1", 
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("O1", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        //
        const productToReplace = new Product("P150", "Product With Bonus", 2);
        await productRepository.create(productToReplace);


        const orderItemToReplace = new OrderItem(
            "OI1", 
            productToReplace.name,
            productToReplace.price,
            productToReplace.id,
            3
        );
                
        order.changeItems([orderItemToReplace]);        
        //
        orderRepository.update(order); 
        await new Promise(resolve => setTimeout(resolve, 1000));       
        const orderReplacedFound = await orderRepository.find(order.id);        
        expect(orderReplacedFound.total()).toBe(6);
        expect(orderReplacedFound.items).toStrictEqual([orderItemToReplace]);

    });

});