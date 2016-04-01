import { Inject, Input, Component, provide } from 'ng-forward';
import { PostCommentComponent } from "./post-comment/post-comment.component";
import { CommentService } from "../../../lib/ng-noosfero-api/http/comment.service";
import { CommentComponent } from "./comment.component";

@Component({
    selector: 'noosfero-comments',
    templateUrl: 'app/article/comment/comments.html',
    directives: [PostCommentComponent, CommentComponent]
})
@Inject(CommentService, "$rootScope")
export class CommentsComponent {

    comments: noosfero.Comment[] = [];
    @Input() showForm = true;
    @Input() article: noosfero.Article;
    @Input() parent: noosfero.Comment;

    constructor(private commentService: CommentService, private $rootScope: ng.IScope) {
        $rootScope.$on(PostCommentComponent.EVENT_COMMENT_RECEIVED, (event: ng.IAngularEvent, comment: noosfero.Comment) => {
            if ((!this.parent && !comment.reply_of) || (comment.reply_of && this.parent && comment.reply_of.id === this.parent.id)) {
                if (!this.comments) this.comments = [];
                this.comments.push(comment);
            }
        });
    }

    ngOnInit() {
        if (this.parent) {
            this.comments = this.parent.replies;
        } else {
            this.commentService.getByArticle(this.article).then((result: noosfero.RestResult<noosfero.Comment[]>) => {
                this.comments = result.data;
            });
        }
    }
}
