import {Injectable, EventEmitter} from "ng-forward";

@Injectable()
export class CommentParagraphEventService {

    private toggleCommentParagraphEmitter: EventEmitter<noosfero.Article>;

    constructor() {
        this.toggleCommentParagraphEmitter = new EventEmitter();
    }

    toggleCommentParagraph(article: noosfero.Article) {
        this.toggleCommentParagraphEmitter.next(article);
    }

    subscribeToggleCommentParagraph(fn: (article: noosfero.Article) => void) {
        this.toggleCommentParagraphEmitter.subscribe(fn);
    }
}
