import { OpaqueToken } from 'ng-forward';
import { EventsHubService, EventsHubKnownEventNames } from './events-hub.service';


describe("EventsHubService", () => {
    let eventsHubService: EventsHubService;
    let event1 = 'Event 1';
    let eventsHubKnownEventNames = <EventsHubKnownEventNames>{ getNames: () => { return [ event1]; }};
    it("emits events for the known events", (done) => {

        let eventListener = () => {
        };
        // creates the events hub service which known the event "Event1"
        eventsHubService = new EventsHubService(eventsHubKnownEventNames);
        // subscribe to the event passing the done Function as the eventListener
        // if the event emits works the done function is called and the
        // test will pass
        eventsHubService.subscribeToEvent<any>(event1, done);
        // emits the event
        eventsHubService.emitEvent(event1, null);
    });

    it("throws error when trying to emit an unknow event", () => {
        let eventListener = () => {
        };
        // creates the events hub service which known the event "Event1"
        eventsHubService = new EventsHubService(eventsHubKnownEventNames);

        // emits the event
        expect(
            () => { eventsHubService.emitEvent('NotKnownEvent', null); }
        ).toThrowError('Unknown event named NotKnownEvent');
    });

    it("throws error when trying to subscribe to an unknow event", () => {
        let eventListener = () => {
        };
        // creates the events hub service which known the event "Event1"
        eventsHubService = new EventsHubService(eventsHubKnownEventNames);

        // emits the event
        expect(
            () => { eventsHubService.subscribeToEvent<void>('NotKnownEvent', () => {}); }
        ).toThrowError('Unknown event named NotKnownEvent');
    });
});