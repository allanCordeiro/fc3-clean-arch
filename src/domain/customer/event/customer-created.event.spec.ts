import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLog1Handler from "./handler/send-console-log-1.handler";
import SendConsoleLog2Handler from "./handler/send-console-log-2.handler";

describe("customer created event unit tests", () => {

    it("should register the event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const handler1 = new SendConsoleLog1Handler();
        const handler2 = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", handler1);
        eventDispatcher.register("CustomerCreatedEvent", handler2);

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(2);
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(handler1);
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]).toMatchObject(handler2);

    });

    it("should unregister the event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const handler1 = new SendConsoleLog1Handler();
        const handler2 = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", handler1);
        eventDispatcher.register("CustomerCreatedEvent", handler2);

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(2);

        eventDispatcher.unregister("CustomerCreatedEvent", handler1);
        eventDispatcher.unregister("CustomerCreatedEvent", handler2);

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(0);        
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const handler1 = new SendConsoleLog1Handler();
        const handler2 = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", handler1);
        eventDispatcher.register("CustomerCreatedEvent", handler2);

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(2);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeUndefined();               
    });

    it("should notify the event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const handler1 = new SendConsoleLog1Handler();
        const handler2 = new SendConsoleLog2Handler();
        const spyEventHandler1 = jest.spyOn(handler1, "handle");        
        const spyEventHandler2 = jest.spyOn(handler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", handler1);
        eventDispatcher.register("CustomerCreatedEvent", handler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(handler1);            
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(handler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer 1",
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });
});