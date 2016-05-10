import { bundle, Input, Inject, Component, Directive } from 'ng-forward';
import {ArticleBlogComponent} from "./types/blog/blog.component";
import {CommentsComponent} from "./comment/comments.component";
import {MacroDirective} from "./macro/macro.directive";
import {ArticleToolbarHotspotComponent} from "../hotspot/article-toolbar-hotspot.component";
import {ArticleContentHotspotComponent} from "../hotspot/article-content-hotspot.component";

/**
 * @ngdoc controller
 * @name ArticleDefaultView
 * @description
 *  A default view for Noosfero Articles. If the specific article view is
 * not implemented, then this view is used.
 */
@Component({
    selector: 'noosfero-default-article',
    templateUrl: 'app/article/article.html'
})
export class ArticleDefaultViewComponent {

    @Input() article: noosfero.Article;
    @Input() profile: noosfero.Profile;

}

/**
 * @ngdoc controller
 * @name ArticleView
 * @description
 *  A dynamic view for articles. It uses the article type to replace
 * the default template with the custom article directive.
 */
@Component({
    selector: 'noosfero-article',
    template: 'not-used',
    directives: [ArticleDefaultViewComponent, ArticleBlogComponent,
        CommentsComponent, MacroDirective, ArticleToolbarHotspotComponent,
        ArticleContentHotspotComponent]
})
@Inject("$element", "$scope", "$injector", "$compile")
export class ArticleViewComponent {

    @Input() article: noosfero.Article;
    @Input() profile: noosfero.Profile;
    directiveName: string;

    ngOnInit() {
        let articleType = this.article.type.replace(/::/, '');
        let specificDirective = 'noosfero' + articleType;
        this.directiveName = "noosfero-default-article";
        if (this.$injector.has(specificDirective + 'Directive')) {
            this.directiveName = specificDirective.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        }
        this.$element.replaceWith(this.$compile('<' + this.directiveName + ' [article]="ctrl.article" [profile]="ctrl.profile"></' + this.directiveName + '>')(this.$scope));
    }

    constructor(
        private $element: any,
        private $scope: ng.IScope,
        private $injector: ng.auto.IInjectorService,
        private $compile: ng.ICompileService) {
    }
}
