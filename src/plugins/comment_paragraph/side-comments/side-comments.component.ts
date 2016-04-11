import {Component, Inject, Input, Output} from "ng-forward";
import {CommentsComponent} from "../../../app/article/comment/comments.component";
import {CommentService} from "../../../lib/ng-noosfero-api/http/comment.service";
import {CommentParagraphService} from "../http/comment-paragraph.service";
import { PostCommentEventService } from "../../../app/article/comment/post-comment/post-comment-event.service";

@Component({
    selector: "comment-paragraph-side-comments",
    templateUrl: 'app/article/comment/comments.html',
})
@Inject(CommentService, PostCommentEventService, "$scope", CommentParagraphService)
export class SideCommentsComponent extends CommentsComponent {

    @Input() article: noosfero.Article;
    @Input() paragraphUuid: string;

    constructor(commentService: CommentService,
        postCommentEventService: PostCommentEventService,
        $scope: ng.IScope,
        private commentParagraphService: CommentParagraphService) {
        super(commentService, postCommentEventService, $scope);
    }

    ngOnInit() {
        super.ngOnInit();
        (<any>this.newComment).paragraph_uuid = this.paragraphUuid;
    }

    loadComments() {
        return this.commentParagraphService.getByArticle(this.article, { page: this.page, per_page: this.perPage, paragraph_uuid: this.paragraphUuid });
    }
}
