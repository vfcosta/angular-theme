import { Inject, Input, Output, EventEmitter, Component, ViewEncapsulation } from '@angular/core';
import { CommentService } from '../../../../lib/ng-noosfero-api/http/comment.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { SessionService } from './../../../login/session.service';

@Component({
    selector: 'noosfero-post-comment',
    templateUrl: './post-comment.html',
    styleUrls: ['./post-comment.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PostCommentComponent {

    public static EVENT_COMMENT_RECEIVED = "comment.received";

    @Input() article: noosfero.Article;
    @Input() parent: noosfero.Comment;
    @Output() commentSaved: EventEmitter<noosfero.Comment> = new EventEmitter<noosfero.Comment>();
    @Input() comment = <noosfero.Comment>{};
    private currentUser: noosfero.User;

    constructor(private commentService: CommentService, private notificationService: NotificationService,
        private session: SessionService) {
        this.currentUser = this.session.currentUser();
    }

    save() {
        console.log("SAVE");
        if (this.parent && this.comment) {
            this.comment.reply_of_id = this.parent.id;
        }
        this.commentService.createInArticle(this.article, this.comment).then((result: noosfero.RestResult<noosfero.Comment>) => {
            this.comment.body = "";
            this.commentSaved.next(result.data);
            this.notificationService.success({ title: "comment.post.success.title", message: "comment.post.success.message" });
        });
    }

    loggedIn() {
        return this.currentUser != null;
    }
}
