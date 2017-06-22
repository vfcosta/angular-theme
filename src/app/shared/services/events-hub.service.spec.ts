import { EventsHubService } from './events-hub.service';

describe("EventsHubService", () => {
    let eventsHubService: EventsHubService;

    it("emits events for the known events", (done) => {

        let eventListener = () => {
        };
        // creates the events hub service which known the event "Event1"
        eventsHubService = new EventsHubService();
        // subscribe to the event passing the done Function as the eventListener
        // if the event emits works the done function is called and the
        // test will pass
        eventsHubService.subscribeToEvent<any>(eventsHubService.knownEvents.BLOCK_CHANGED, done);
        // emits the event
        eventsHubService.emitEvent(eventsHubService.knownEvents.BLOCK_CHANGED, null);
    });

    it("throws error when trying to emit an unknow event", () => {
        let eventListener = () => {
        };
        // creates the events hub service which known the event "Event1"
        eventsHubService = new EventsHubService();

        // emits the event
        expect(
            () => { eventsHubService.emitEvent('NotKnownEvent', null); }
        ).toThrowError('Unknown event named NotKnownEvent');
    });

    it("throws error when trying to subscribe to an unknow event", () => {
        let eventListener = () => {
        };
        // creates the events hub service which known the event "Event1"
        eventsHubService = new EventsHubService();

        // emits the event
        expect(
            () => { eventsHubService.subscribeToEvent<void>('NotKnownEvent', () => {}); }
        ).toThrowError('Unknown event named NotKnownEvent');
    });
});