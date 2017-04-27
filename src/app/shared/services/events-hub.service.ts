import { Injectable, Inject, OpaqueToken, EventEmitter } from 'ng-forward';
import { NoosferoKnownEvents } from "../../known-events";

@Injectable()
export class EventsHubService {

    private emitters: Map<string, EventEmitter<any>>;
    knownEvents = new NoosferoKnownEvents();

    constructor() {
        this.emitters = new Map<string, EventEmitter<any>>();
        this.setupEmitters();
    }

    emitEvent(eventType: string, payload?: any) {
        this.checkKnownEvent(eventType);
        let event = this.emitters.get(eventType);
        if (event) this.emitters.get(eventType).next(payload);
    }

    subscribeToEvent<T>(eventType: string, generatorOrNext?: ((p?: T) => void), error?: any, complete?: any) {
        this.checkKnownEvent(eventType);
        let event = this.emitters.get(eventType);
        if (event) event.subscribe(generatorOrNext, error, complete);
    }

    private setupEmitters() {
        this.knownEvents.getNames().forEach((event: string) => {
            this.emitters.set(event, new EventEmitter<any>());
        });
    }

    private checkKnownEvent(eventType: string) {
        if (!this.emitters.has(eventType)) {
            throw new Error('Unknown event named ' + eventType.toString());
        }
    }
}
