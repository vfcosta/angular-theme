import { Inject, Input, Component, ChangeDetectorRef, ViewEncapsulation, OnInit, Output } from '@angular/core';
import { CommentService } from '../../../lib/ng-noosfero-api/http/comment.service';
import { CommentComponent } from './comment.component';

@Component({
    selector: 'noosfero-comments',
    templateUrl: './comments.html',
    styleUrls: ['./comments.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CommentsComponent implements OnInit {

    comments: noosfero.CommentViewModel[] = [];
    @Input() showForm = true;
    @Input() article: noosfero.Article;
    @Input() parent: noosfero.CommentViewModel;
    @Input() fullPagination = false;
    protected page = 1;
    protected perPage = 5;
    protected total = 0;

    newComment = <noosfero.Comment>{};

    constructor(protected commentService: CommentService) { }

    ngOnInit() {
        if (this.parent) {
            this.comments = this.parent.replies;
        } else {
            this.loadNextPage();
        }
    }

    @Output()
    commentAdded(comment: noosfero.CommentViewModel): void {
        comment.__show_reply = false;
        if (comment.reply_of) {
            this.comments.forEach((commentOnList) => {
                if (commentOnList.id === comment.reply_of.id) {
                    if (commentOnList.replies) {
                        commentOnList.replies.push(comment);
                    } else {
                        commentOnList.replies = [comment];
                    }
                }
            });
        }
        this.comments = [...this.comments, comment];
        this.resetShowReply();
    }

    commentRemoved(comment: noosfero.Comment): void {
        const index = this.comments.indexOf(comment, 0);
        if (index >= 0) {
            this.comments.splice(index, 1);
        }
        this.comments = [...this.comments];
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
            if (this.fullPagination) {
                this.comments = result.data;
            } else {
                this.comments = this.comments.concat(result.data);
                this.page++;
            }
            this.total = result.headers ? (<any>result.headers).get("total") : this.comments.length;
        });
    }

    displayMore() {
        return !this.parent && !this.fullPagination && this.getPages() >= this.page;
    }

    displayFullPagination() {
        return !this.parent && this.fullPagination && this.getPages() > 1;
    }

    private getPages() {
        return Math.ceil(this.total / this.perPage);
    }
}
