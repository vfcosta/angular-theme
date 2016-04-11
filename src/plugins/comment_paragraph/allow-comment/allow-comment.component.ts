import {Component, Input, Inject} from "ng-forward";
import {SideCommentsComponent} from "../side-comments/side-comments.component";
import {CommentParagraphEventService} from "../events/comment-paragraph-event.service";

@Component({
    selector: "comment-paragraph-plugin-allow-comment",
    templateUrl: "plugins/comment_paragraph/allow-comment/allow-comment.html",
    directives: [SideCommentsComponent]
})
@Inject("$scope", CommentParagraphEventService)
export class AllowCommentComponent {

    @Input() content: string;
    @Input() paragraphUuid: string;
    @Input() article: noosfero.Article;

    constructor(private $scope: ng.IScope, private commentParagraphEventService: CommentParagraphEventService) { }

    ngOnInit() {
        this.commentParagraphEventService.subscribeToggleCommentParagraph((article: noosfero.Article) => {
            this.article = article;
            this.$scope.$apply();
        });
    }

    isActivated() {
        return this.article.setting.comment_paragraph_plugin_activate;
    }

}
