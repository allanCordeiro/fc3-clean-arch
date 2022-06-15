import EventDispatcher from "./event-dispatcher";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

describe("event dispatcher unit testes", () => {
    
    it("should register events", () => {
        const eventDispatcher = new EventDispatcher();
        const mockEventHandler : EventHandlerInterface = {
            handle: jest.fn(),
        };
    
        eventDispatcher.register("MockEvent", mockEventHandler);

        expect(eventDispatcher.getEventHandlers["MockEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["MockEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["MockEvent"][0]).toMatchObject(mockEventHandler);

    });

    it("should unregister events", () => {
        const eventDispatcher = new EventDispatcher();
        const mockEventHandler : EventHandlerInterface = {
            handle: jest.fn(),
        };
    
        eventDispatcher.register("MockEvent", mockEventHandler);

        expect(eventDispatcher.getEventHandlers["MockEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["MockEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["MockEvent"][0]).toMatchObject(mockEventHandler);

        eventDispatcher.unregister("MockEvent", mockEventHandler);
        expect(eventDispatcher.getEventHandlers["MockEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["MockEvent"].length).toBe(0);

    });

    it("should unregister all events", () => {
        const eventDispatcher = new EventDispatcher();
        const mockEventHandler : EventHandlerInterface = {
            handle: jest.fn(),
        };
    
        eventDispatcher.register("MockEvent", mockEventHandler);

        expect(eventDispatcher.getEventHandlers["MockEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["MockEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["MockEvent"][0]).toMatchObject(mockEventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["MockEvent"]).toBeUndefined();
        
    });

    it("should notify events", () => {
        const eventDispatcher = new EventDispatcher();
        const mockEventHandler : EventHandlerInterface = {
            handle: jest.fn(),
        };
        
        const spyEventHandler = jest.spyOn(mockEventHandler, "handle");
    
        eventDispatcher.register("Object", mockEventHandler);

        expect(eventDispatcher.getEventHandlers["Object"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["Object"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["Object"][0]).toMatchObject(mockEventHandler);

        const fakeData = { data: "fake"};
        const mockEvent: EventInterface = {
            dataTimeOccurred: new Date(), 
            eventData: fakeData
        }
        console.log(mockEvent.constructor.name);
        
        eventDispatcher.notify(mockEvent);

        expect(spyEventHandler).toHaveBeenCalled();

    });
});