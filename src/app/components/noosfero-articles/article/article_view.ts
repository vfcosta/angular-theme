import { bundle, Input, Inject, Component, Directive } from 'ng-forward';
import {ArticleBlog} from "../blog/blog.component";

/**
 * @ngdoc controller
 * @name ArticleDefaultView
 * @description
 *  A default view for Noosfero Articles. If the specific article view is
 * not implemented, then this view is used.
 */
@Component({
    selector: 'noosfero-default-article',
    templateUrl: 'app/components/noosfero-articles/article/article.html'
})
export class ArticleDefaultView {

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
    directives: [ArticleDefaultView, ArticleBlog]
})
@Inject("$element", "$scope", "$injector", "$compile")
export class ArticleView {

    @Input() article: noosfero.Article;
    @Input() profile: noosfero.Profile;
    directiveName: string;

    ngOnInit() {
        let specificDirective = 'noosfero' + this.article.type;
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
