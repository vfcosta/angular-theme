import {Component, Inject, Input, Output} from "ng-forward";
import {CommentsComponent} from "../../../app/article/comment/comments.component";
import {CommentService} from "../../../lib/ng-noosfero-api/http/comment.service";
import {CommentParagraphService} from "../http/comment-paragraph.service";

@Component({
    selector: "comment-paragraph-side-comments",
    templateUrl: 'app/article/comment/comments.html',
})
@Inject(CommentService, "$rootScope", CommentParagraphService)
export class SideCommentsComponent extends CommentsComponent {

    @Input() article: noosfero.Article;
    @Input() paragraphUuid: string;

    constructor(commentService: CommentService, $rootScope: ng.IScope, private commentParagraphService: CommentParagraphService) {
        super(commentService, $rootScope);
    }

    ngOnInit() {
        super.ngOnInit();
        (<any>this.newComment).paragraph_uuid = this.paragraphUuid;
    }

    loadComments() {
        return this.commentParagraphService.getByArticle(this.article, { page: this.page, per_page: this.perPage, paragraph_uuid: this.paragraphUuid });
    }
}
