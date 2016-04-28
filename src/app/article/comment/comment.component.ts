import { Inject, Input, Component, Output, EventEmitter } from 'ng-forward';
import { PostCommentComponent } from "./post-comment/post-comment.component";

@Component({
    selector: 'noosfero-comment',
    templateUrl: 'app/article/comment/comment.html'
})
export class CommentComponent {

    @Input() comment: noosfero.CommentViewModel;
    @Input() article: noosfero.Article;

    showReply() {
        return this.comment && this.comment.__show_reply === true;
    }

    constructor() {
    }


    reply() {
        this.comment.__show_reply = !this.comment.__show_reply;
    }
}
