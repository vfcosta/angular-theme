import { Inject, Input, Component, provide } from 'ng-forward';
import { PostCommentComponent } from "./post-comment/post-comment.component";
import { CommentService } from "../../../lib/ng-noosfero-api/http/comment.service";
import { CommentComponent } from "./comment.component";

@Component({
    selector: 'noosfero-comments',
    templateUrl: 'app/article/comment/comments.html',
    directives: [PostCommentComponent, CommentComponent],
    outputs: ['commentAdded']
})
@Inject(CommentService, "$scope")
export class CommentsComponent {

    comments: noosfero.CommentViewModel[] = [];
    @Input() showForm = true;
    @Input() article: noosfero.Article;
    @Input() parent: noosfero.CommentViewModel;
    protected page = 1;
    protected perPage = 5;
    protected total = 0;

    newComment = <noosfero.Comment>{};

    constructor(protected commentService: CommentService, private $scope: ng.IScope) { }

    ngOnInit() {
        if (this.parent) {
            this.comments = this.parent.replies;
        } else {
            this.loadNextPage();
        }
    }

    commentAdded(comment: noosfero.CommentViewModel): void {
        comment.__show_reply = false;
        if (comment.reply_of) {
            this.comments.forEach((commentOnList) => {
                if (commentOnList.id == comment.reply_of.id) {
                    if (commentOnList.replies) {
                        commentOnList.replies.push(comment);
                    } else {
                        commentOnList.replies = [comment];
                    }
                }
            });
        }
        this.comments.push(comment);
        this.resetShowReply();
        this.$scope.$apply();
    }

    commentRemoved(comment: noosfero.Comment): void {
        let index = this.comments.indexOf(comment, 0);
        if (index >= 0) {
            this.comments.splice(index, 1);
        }
    }

    private resetShowReply() {
        this.comments.forEach((comment: noosfero.CommentViewModel) => {
            comment.__show_reply = false;
        });
        if (this.parent) {
            this.parent.__show_reply = false;
        }

    }

    loadComments() {
        return this.commentService.getByArticle(this.article, { page: this.page, per_page: this.perPage });
    }

    loadNextPage() {
        this.loadComments().then((result: noosfero.RestResult<noosfero.Comment[]>) => {
            this.comments = this.comments.concat(result.data);
            this.total = result.headers ? result.headers("total") : this.comments.length;
            this.page++;
        });
    }

    displayMore() {
        let pages = Math.ceil(this.total / this.perPage);
        return !this.parent && pages >= this.page;
    }
}
