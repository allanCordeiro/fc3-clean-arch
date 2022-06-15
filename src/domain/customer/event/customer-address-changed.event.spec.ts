import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import SendConsoleLogWhenAddressChanged from "./handler/send-console-log-when-address-changed.handler";

describe("customer address changed unit tests", () => {
    it("should register the event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenAddressChanged();        

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);        

        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]).toMatchObject(eventHandler);        
    });

    it("should unregister the event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenAddressChanged();        

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);        

        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length).toBe(1);        
        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]).toMatchObject(eventHandler);        

        eventDispatcher.unregister("CustomerAddressChangedEvent", eventHandler); 
        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length).toBe(0);        
    });

    it("should unregister all the event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenAddressChanged();        

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);        

        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length).toBe(1);        
        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]).toMatchObject(eventHandler);        

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']).toBeUndefined();
    });

    it("should notify the event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenAddressChanged();        
        const spyHandlerEvent = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);        

        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]).toMatchObject(eventHandler);
        
        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: "Customer 1",
            name: "Customer name",
            address: "New address",
        });

        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyHandlerEvent).toHaveBeenCalled();
    });
});