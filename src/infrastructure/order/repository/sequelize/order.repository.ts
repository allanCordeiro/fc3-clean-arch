import Order from "../../../../domain/checkout/entity/order";
import order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity
                })),
            },
            {
                include: [{ model: OrderItemModel}],
            }
        );
    }

    async update(entity: order): Promise<void> {
        const sequelize = OrderModel.sequelize;
        await sequelize.transaction(async (t) => {
            await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction: t,
            });
            const items = entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id,
            }));
            await OrderItemModel.bulkCreate(items, { transaction: t });
            await OrderModel.update(
                { total: entity.total() },
                { where: { id: entity.id }, transaction: t }
            );
        });
    }
       

    async find(id: string): Promise<order> {
        let orderModel: OrderModel;
        try {
            orderModel = await OrderModel.findOne({
                where: {id},
                include: ["items"],
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error("Order not found");
            
        }

        const order = new Order(
            orderModel.id, 
            orderModel.customer_id,             
            orderModel.items.map(item => new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
            )),
        );

        return order;

    }
    async findAll(): Promise<order[]> {
        const ordersModel = await OrderModel.findAll({include: ["items"]});

        const orders = ordersModel.map(orderModel => {            
            let order = new Order(
                orderModel.id,
                orderModel.customer_id,                
                orderModel.items.map(item => new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity
                )),
            );
            return order;
        });        

        return orders; 
    }

}