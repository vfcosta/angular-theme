import { bundle, Input, Inject, Component, Directive } from 'ng-forward';
import {ArticleBlogComponent} from "./types/blog/blog.component";
import {CommentsComponent} from "./comment/comments.component";
import {MacroDirective} from "./macro/macro.directive";
import {ArticleToolbarHotspotComponent} from "../hotspot/article-toolbar-hotspot.component";
import {ArticleContentHotspotComponent} from "../hotspot/article-content-hotspot.component";
import {ArticleService} from "./../../lib/ng-noosfero-api/http/article.service";
import {NotificationService} from "./../shared/services/notification.service";
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
@Inject("$state", ArticleService, NotificationService)
export class ArticleDefaultViewComponent {

    @Input() article: noosfero.Article;
    @Input() profile: noosfero.Profile;

    constructor(private $state: ng.ui.IStateService, public articleService: ArticleService, protected notificationService: NotificationService) {
        // Subscribe to the Article Removed Event
        this.articleService.subscribeToModelRemoved((article: noosfero.Article) => {
            if (this.article.parent) {
                this.$state.transitionTo('main.profile.page', { page: this.article.parent.path, profile: this.article.profile.identifier });
            } else {
                this.$state.transitionTo('main.profile.info', { profile: this.article.profile.identifier });
            }
        });
    }

    delete() {
        this.articleService.remove(this.article).catch((cause: any) => {
            // TODO - Montar mensagem de erro com a causa 
            this.notificationService.error({ message: "article.default_view.remove.failed"});
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
