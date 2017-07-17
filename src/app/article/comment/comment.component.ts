import { Inject, Input, Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommentService } from '../../../lib/ng-noosfero-api/http/comment.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
    selector: 'noosfero-comment',
    templateUrl: './comment.html',
    styleUrls: ['./comment.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CommentComponent {

    @Input() comment: noosfero.CommentViewModel;
    @Input() article: noosfero.Article;
    @Input() displayActions = true;
    @Input() displayReplies = true;
    @Output() commentRemoved: EventEmitter<noosfero.CommentViewModel> = new EventEmitter<noosfero.CommentViewModel>();

    showReply() {
        return this.comment && this.comment.__show_reply === true;
    }

    constructor(private commentService: CommentService, private notificationService: NotificationService) { }

    reply() {
        this.comment.__show_reply = !this.comment.__show_reply;
    }

    allowRemove() {
        return true;
    }

    remove() {
        this.notificationService.confirmation({ title: "comment.remove.confirmation.title", message: "comment.remove.confirmation.message" }, () => {
            this.commentService.removeFromArticle(this.article, this.comment).then((result: noosfero.RestResult<noosfero.Comment>) => {
                this.commentRemoved.next(this.comment);
                this.notificationService.success({ title: "comment.remove.success.title", message: "comment.remove.success.message" });
            });
        });
    }
}
