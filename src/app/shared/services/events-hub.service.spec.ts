import { OpaqueToken } from 'ng-forward';
import { EventsHubService } from './events-hub.service';


describe("EventsHubService", () => {
    let eventsHubService: EventsHubService;

    it("emits events for the known events", (done) => {
        let event = "Event1";

        let eventListener = () => {
        };
        // creates the events hub service which known the event "Event1"
        eventsHubService = new EventsHubService([
            event
        ]);
        // subscribe to the event passing the done Function as the eventListener
        // if the event emits works the done function is called and the
        // test will pass
        eventsHubService.subscribeToEvent<any>(event, done);
        // emits the event
        eventsHubService.emitEvent(event, null);
    });

    it("throws error when trying to emit an unknow event", () => {
        let eventListener = () => {
        };
        // creates the events hub service which known the event "Event1"
        eventsHubService = new EventsHubService([
            'Event1'
        ]);

        // emits the event
        expect(
            () => { eventsHubService.emitEvent('NotKnownEvent', null); }
        ).toThrowError('Unknown event named NotKnownEvent');
    });

    it("throws error when trying to subscribe to an unknow event", () => {
        let eventListener = () => {
        };
        // creates the events hub service which known the event "Event1"
        eventsHubService = new EventsHubService([
            'Event1'
        ]);

        // emits the event
        expect(
            () => { eventsHubService.subscribeToEvent<void>('NotKnownEvent', () => {}); }
        ).toThrowError('Unknown event named NotKnownEvent');
    });
});