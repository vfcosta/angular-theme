import {Injectable, EventEmitter} from "ng-forward";

@Injectable()
export class PostCommentEventService {

    private eventEmitter: EventEmitter<noosfero.Comment>;

    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    emit(comment: noosfero.Comment) {
        this.eventEmitter.next(comment);
    }

    subscribe(fn: (comment: noosfero.Comment) => void) {
        this.eventEmitter.subscribe(fn);
    }
}
