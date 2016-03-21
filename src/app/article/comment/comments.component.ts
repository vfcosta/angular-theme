import { Inject, Input, Component, provide } from 'ng-forward';
import { PostCommentComponent } from "./post-comment.component";
import { CommentService } from "../../../lib/ng-noosfero-api/http/comment.service";
import { CommentComponent } from "./comment.component";

@Component({
    selector: 'comments',
    templateUrl: 'app/article/comment/comments.html',
    directives: [PostCommentComponent, CommentComponent]
})
@Inject(CommentService)
export class CommentsComponent {

    comments: noosfero.Comment[];
    @Input() article: noosfero.Article;

    constructor(private commentService: CommentService) { }

    ngOnInit() {
        this.commentService.getByArticle(this.article).then((result: noosfero.RestResult<noosfero.Comment[]>) => {
            this.comments = result.data;
        });
    }
}
