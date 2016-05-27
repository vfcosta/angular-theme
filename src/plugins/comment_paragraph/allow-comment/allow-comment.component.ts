import {Component, Input, Inject} from "ng-forward";
import {SideCommentsComponent} from "../side-comments/side-comments.component";
import {CommentParagraphEventService} from "../events/comment-paragraph-event.service";
import {CommentParagraphService} from "../http/comment-paragraph.service";
import {CommentService} from "./../../../lib/ng-noosfero-api/http/comment.service";

@Component({
    selector: "comment-paragraph-plugin-allow-comment",
    templateUrl: "plugins/comment_paragraph/allow-comment/allow-comment.html",
    directives: [SideCommentsComponent]
})
@Inject("$scope", CommentParagraphEventService, CommentParagraphService, CommentService)
export class AllowCommentComponent {

    @Input() content: string;
    @Input() paragraphUuid: string;
    @Input() article: noosfero.Article;
    commentsCount: number = 0;
    display = false;

    constructor(private $scope: ng.IScope,
        private commentParagraphEventService: CommentParagraphEventService,
        private commentParagraphService: CommentParagraphService,
        private commentService: CommentService
    ) { }

    ngOnInit() {
        this.commentParagraphEventService.subscribeToggleCommentParagraph((article: noosfero.Article) => {
            this.article = article;
            this.$scope.$apply();
        });
        this.commentParagraphService.commentParagraphCount(this.article, this.paragraphUuid).then((count: number) => {
            this.commentsCount = count ? count : 0;
        });

        this.commentService.subscribeToModelAdded((comment: noosfero.CommentParagraph) => {
            if (comment.paragraph_uuid === this.paragraphUuid) {
                this.commentsCount += 1;
            };
        });

        this.commentService.subscribeToModelRemoved((comment: noosfero.CommentParagraph) => {
            if (comment.paragraph_uuid === this.paragraphUuid) {
                this.commentsCount -= (comment.replies) ? 1 + comment.replies.length : 1;
            };
        });
    }

    isActivated() {
        return this.article && this.article.setting &&
            this.article.setting.comment_paragraph_plugin_activate &&
            (this.article.accept_comments || this.commentsCount > 0);
    }

    showParagraphComments() {
        this.display = true;
    }

    hideParagraphComments() {
        this.display = false;
    }
}
