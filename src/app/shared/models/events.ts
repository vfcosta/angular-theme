import {ArrayUtils} from "./../utils/arrays";

export abstract class EventType {
    /**
     * All possible types for the event
     */
    types = new Array<string>();

    /**
     * The event type
     */
    type: string;

    constructor(types: Array<string>, type: string) {
        this.types = types;
        this.type = type;
    }

    equals(other: EventType) {
        return ArrayUtils.arraysEqual(this.types, other.types) && this.type === other.type;
    }

}

export class ArticleEventType extends EventType {
    static types = ["added", "removed"];
    static removed: ArticleEventType = new ArticleEventType("removed");
    static added: ArticleEventType = new ArticleEventType("added");

    constructor(type: string) {
        super(ArticleEventType.types, type);
    }
}

/**
 * A model event have a type (ModelEventType), and optionally with a model element. 
 * Therefore, it is possible to have events related to specific model elements. 
 * If the model element element is not provided, then the event is a generic event 
 * of the given type.
 */
export class ModelEvent {
    private type: EventType;
    private id: number;

    static event(type: EventType, model?: noosfero.RestModel): ModelEvent {
        if (model) {
            return new ModelEvent(type, model.id);
        } else {
            return new ModelEvent(type);
        }
    }

    constructor(type: EventType, id?: number) {
        this.type = type;
        this.id = id;
    }

    equals(other: ModelEvent) {
        return other.type.equals(this.type) && other.id === this.id;
    }

}
