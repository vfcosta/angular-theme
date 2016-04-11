import { Input, Inject, Component } from "ng-forward";
import {Hotspot} from "../../../app/hotspot/hotspot.decorator";
import {CommentParagraphService} from "../http/comment-paragraph.service";

@Component({
    selector: "comment-paragraph-article-button-hotspot",
    templateUrl: "plugins/comment_paragraph/hotspot/comment-paragraph-article-button.html",
})
@Inject("$scope", CommentParagraphService)
@Hotspot("article_extra_toolbar_buttons")
export class CommentParagraphArticleButtonHotspotComponent {

    @Input() article: noosfero.Article;

    constructor(private $scope: ng.IScope, private commentParagraphService: CommentParagraphService) { }

    deactivateCommentParagraph() {
        this.commentParagraphService.deactivateCommentParagraph(this.article).then((result: noosfero.RestResult<noosfero.Article>) => {
            this.article = result.data;
        });
    }

    activateCommentParagraph() {
        this.commentParagraphService.activateCommentParagraph(this.article).then((result: noosfero.RestResult<noosfero.Article>) => {
            this.article = result.data;
        });
    }
}
