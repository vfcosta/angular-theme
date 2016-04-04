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
    private page = 1;
    private perPage = 5;

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
            this.loadNextPage();
        }
    }

    loadNextPage() {
        this.commentService.getByArticle(this.article, { page: this.page, per_page: this.perPage }).then((result: noosfero.RestResult<noosfero.Comment[]>) => {
            this.comments = this.comments.concat(result.data);
            this.page++;
        });
    }
}
