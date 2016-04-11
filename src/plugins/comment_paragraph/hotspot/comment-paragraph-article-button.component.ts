import { Input, Inject, Component } from "ng-forward";
import {Hotspot} from "../../../app/hotspot/hotspot.decorator";
import {CommentParagraphService} from "../http/comment-paragraph.service";
import {CommentParagraphEventService} from "../events/comment-paragraph-event.service";

@Component({
    selector: "comment-paragraph-article-button-hotspot",
    templateUrl: "plugins/comment_paragraph/hotspot/comment-paragraph-article-button.html",
})
@Inject("$scope", CommentParagraphService, CommentParagraphEventService)
@Hotspot("article_extra_toolbar_buttons")
export class CommentParagraphArticleButtonHotspotComponent {

    @Input() article: noosfero.Article;

    constructor(private $scope: ng.IScope,
        private commentParagraphService: CommentParagraphService,
        private commentParagraphEventService: CommentParagraphEventService) { }

    deactivateCommentParagraph() {
        this.commentParagraphService.deactivateCommentParagraph(this.article).then((result: noosfero.RestResult<noosfero.Article>) => {
            this.article = result.data;
            this.commentParagraphEventService.toggleCommentParagraph(this.article);
        });
    }

    activateCommentParagraph() {
        this.commentParagraphService.activateCommentParagraph(this.article).then((result: noosfero.RestResult<noosfero.Article>) => {
            this.article = result.data;
            this.commentParagraphEventService.toggleCommentParagraph(this.article);
        });
    }
}
