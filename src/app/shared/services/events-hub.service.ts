import { Injectable, Inject, OpaqueToken, EventEmitter } from 'ng-forward';

export const EVENTS_HUB_KNOWN_LIST = new OpaqueToken('EVENTS_HUB_KNOWN_LIST');

@Injectable()
@Inject(EVENTS_HUB_KNOWN_LIST)
export class EventsHubService {

    private emitters: Map<string, EventEmitter<any>>;

    constructor(private knownEvents: string[]) {
        this.emitters = new Map<string, EventEmitter<any>>();
        this.setupEmitters();
    }

    emitEvent(eventType: string, payload?: any) {
        this.checkKnownEvent(eventType);
        let event = this.emitters.get(eventType);
        if ( event ) this.emitters.get(eventType).next(payload);
    }

    subscribeToEvent<T>(eventType: string, generatorOrNext?: ((p?: T) => void), error?: any, complete?: any) {
        this.checkKnownEvent(eventType);
        let event = this.emitters.get(eventType);
        if (event)  event.subscribe(generatorOrNext, error, complete);
    }

    private setupEmitters() {
        for (let i: number = 0; i < this.knownEvents.length; i++) {
            this.emitters.set(this.knownEvents[i], new EventEmitter<any>());
        }
    }

    private checkKnownEvent(eventType: string) {
        if (!this.emitters.has(eventType)) {
            throw new Error('Unknown event named ' + eventType.toString());
        }
    }


}