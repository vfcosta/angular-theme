import {Component, Input, Inject} from "ng-forward";
import * as plugins from "../../plugins";
import {dasherize} from "ng-forward/cjs/util/helpers";
import {PluginHotspot} from "./plugin-hotspot";

@Component({
    selector: "noosfero-hotspot-article-content",
    template: "<span></span>"
})
@Inject("$element", "$scope", "$compile")
export class ArticleContentHotspotComponent extends PluginHotspot {

    @Input() article: noosfero.Article;

    constructor(
        private $element: any,
        private $scope: ng.IScope,
        private $compile: ng.ICompileService) {
        super("article_extra_content");
    }

    addHotspot(directiveName: string) {
        this.$element.append(this.$compile('<' + directiveName + ' [article]="ctrl.article"></' + directiveName + '>')(this.$scope));
    }
}
