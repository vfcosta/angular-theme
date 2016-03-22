import { Input, Component } from 'ng-forward';

@Component({
    selector: 'noosfero-comment',
    templateUrl: 'app/article/comment/comment.html'
})
export class CommentComponent {

    @Input() comment: noosfero.Comment;
    @Input() article: noosfero.Article;

    showReply: boolean = false;

    reply() {
        this.showReply = true;
    }
}
