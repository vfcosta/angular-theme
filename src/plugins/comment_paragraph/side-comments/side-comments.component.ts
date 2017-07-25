import { CommentsComponent } from './../../../app/article/comment/comments.component';
import { Component, Inject, Input, Output, ViewEncapsulation, OnInit } from '@angular/core';
import { CommentService } from '../../../lib/ng-noosfero-api/http/comment.service';
import { CommentParagraphService } from '../http/comment-paragraph.service';

@Component({
    selector: "comment-paragraph-side-comments",
    templateUrl: './../../../app/article/comment/comments.html',
    styleUrls: ['./side-comments.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SideCommentsComponent extends CommentsComponent implements OnInit {

    @Input() article: noosfero.Article;
    @Input() paragraphUuid: string;
    @Input() fullPagination = true;

    constructor(commentService: CommentService,
        private commentParagraphService: CommentParagraphService) {
        super(commentService);
    }

    ngOnInit() {
        super.ngOnInit();
        (<any>this.newComment).paragraph_uuid = this.paragraphUuid;
    }

    loadComments() {
        return this.commentParagraphService.getByArticle(this.article, { page: this.page, per_page: this.perPage, paragraph_uuid: this.paragraphUuid });
    }
}
