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
    @Input() article: noosfero.Article;

    constructor(private commentService: CommentService, private $rootScope: ng.IScope) {
        $rootScope.$on(PostCommentComponent.EVENT_COMMENT_RECEIVED, (event: ng.IAngularEvent, comment: noosfero.Comment) => {
            this.comments.push(comment);
        });
    }

    ngOnInit() {
        this.commentService.getByArticle(this.article).then((result: noosfero.RestResult<noosfero.Comment[]>) => {
            this.comments = result.data;
        });
    }
}
