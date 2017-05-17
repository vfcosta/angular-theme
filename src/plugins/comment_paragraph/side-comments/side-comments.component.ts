import { Component, Inject, Input, Output } from "@angular/core";
import { CommentsComponent } from "../../../app/article/comment/comments.component";
import { CommentService } from "../../../lib/ng-noosfero-api/http/comment.service";
import { CommentParagraphService } from "../http/comment-paragraph.service";

@Component({
    selector: "comment-paragraph-side-comments",
    template: require('app/article/comment/comments.html'),
})
export class SideCommentsComponent extends CommentsComponent {

    @Input() article: noosfero.Article;
    @Input() paragraphUuid: string;
    @Input() fullPagination = true;

    constructor(@Inject('commentService') commentService: CommentService,
        @Inject('$scope') $scope: ng.IScope,
        @Inject("commentParagraphService") private commentParagraphService: CommentParagraphService) {
        super(commentService, $scope);
    }

    ngOnInit() {
        super.ngOnInit();
        (<any>this.newComment).paragraph_uuid = this.paragraphUuid;
    }

    loadComments() {
        return this.commentParagraphService.getByArticle(this.article, { page: this.page, per_page: this.perPage, paragraph_uuid: this.paragraphUuid });
    }
}
