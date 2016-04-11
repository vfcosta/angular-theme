import {Component, Input, Inject} from "ng-forward";
import {SideCommentsComponent} from "../side-comments/side-comments.component";
import {CommentParagraphEventService} from "../events/comment-paragraph-event.service";
import {CommentParagraphService} from "../http/comment-paragraph.service";

@Component({
    selector: "comment-paragraph-plugin-allow-comment",
    templateUrl: "plugins/comment_paragraph/allow-comment/allow-comment.html",
    directives: [SideCommentsComponent]
})
@Inject("$scope", CommentParagraphEventService, CommentParagraphService)
export class AllowCommentComponent {

    @Input() content: string;
    @Input() paragraphUuid: string;
    @Input() article: noosfero.Article;
    commentsCount: number;
    display = false;

    constructor(private $scope: ng.IScope,
        private commentParagraphEventService: CommentParagraphEventService,
        private commentParagraphService: CommentParagraphService) { }

    ngOnInit() {
        this.commentParagraphEventService.subscribeToggleCommentParagraph((article: noosfero.Article) => {
            this.article = article;
            this.$scope.$apply();
        });
        this.commentParagraphService.commentParagraphCount(this.article, this.paragraphUuid).then((count: any) => {
            this.commentsCount = count;
        });
    }

    isActivated() {
        return this.article.setting.comment_paragraph_plugin_activate;
    }

    showParagraphComments() {
        this.display = true;
    }

    hideParagraphComments() {
        this.display = false;
    }
}
