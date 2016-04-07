import { Input, Inject, Component } from "ng-forward";
import {Hotspot} from "../../../app/hotspot/hotspot.decorator";

@Component({
    selector: "comment-paragraph-article-button-hotspot",
    templateUrl: "plugins/comment_paragraph/hotspot/article-button.html",
})
@Inject("$scope")
@Hotspot("article_extra_toolbar_buttons")
export class CommentParagraphArticleButtonHotspotComponent {

    @Input() article: noosfero.Article;

    constructor(private $scope: ng.IScope) { }
}
