import { bundle, Input, Inject, Component, Directive } from 'ng-forward';
import {ArticleBlogComponent} from "./types/blog/blog.component";
import {CommentsComponent} from "./comment/comments.component";
import {MacroDirective} from "./macro/macro.directive";
import {ArticleToolbarHotspotComponent} from "../hotspot/article-toolbar-hotspot.component";
import {ArticleContentHotspotComponent} from "../hotspot/article-content-hotspot.component";
import {ArticleService} from "./../../lib/ng-noosfero-api/http/article.service";
import {ModelEvent, ArticleEventType} from "./../shared/models/events";

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
@Inject("$state", ArticleService)
export class ArticleDefaultViewComponent {

    @Input() article: noosfero.Article;
    @Input() profile: noosfero.Profile;

    constructor(private $state: ng.ui.IStateService, public articleService: ArticleService) {
        // Subscribe to the Article Removed Event
        let event = ModelEvent.event(ArticleEventType.removed);
        this.articleService.subscribe(event, (article: noosfero.Article) => {
            if (this.article.parent) {
                this.$state.transitionTo('main.profile.page', { page: this.article.parent.path, profile: this.article.profile.identifier });
            } else {
                this.$state.transitionTo('main.profile.info', { profile: this.article.profile.identifier });
            }
        });
    }

    delete() {
        this.articleService.removeArticle(this.article).catch((cause: any) => {
            throw new Error(`Problem removing the article: ${cause}`);
        });
    }

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
