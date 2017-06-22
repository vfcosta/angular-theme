import { DomSanitizer } from '@angular/platform-browser';
import { Input, Inject, Component, Directive } from '@angular/core';
import {ArticleService} from "../../../../lib/ng-noosfero-api/http/article.service";
import { NotificationService } from "../../../shared/services/notification.service";
import {PermissionDirective} from '../../../shared/components/permission/permission.directive';

/**
 * @ngdoc controller
 * @name ArticleDefaultView
 * @description
 *  A default view for Noosfero Articles. If the specific article view is
 * not implemented, then this view is used.
 */
@Component({
    selector: 'noosfero-default-article',
    template: require('app/article/types/default/article-default.html'),
})
export class ArticleDefaultViewComponent {

    @Input() article: noosfero.Article;
    @Input() profile: noosfero.Profile;

    constructor(@Inject("$state") private $state: ng.ui.IStateService,
        public articleService: ArticleService, public notificationService: NotificationService,
        private sanitizer: DomSanitizer) {
        // Subscribe to the Article Removed Event
        this.articleService.subscribeToModelRemoved((article: noosfero.Article) => {
            if (this.article.parent) {
                this.$state.transitionTo('main.profile.page', { page: this.article.parent.path, profile: this.article.profile.identifier });
            } else {
                this.$state.transitionTo('main.profile.info', { profile: this.article.profile.identifier });
            }
            this.notificationService.success({ title: "article.remove.success.title", message: "article.remove.success.message" });
        });
    }

    delete() {
        this.notificationService.confirmation({ title: "article.remove.confirmation.title", message: "article.remove.confirmation.message" }, () => {
            this.doDelete();
        });
    }

    doDelete() {
        this.articleService.remove(this.article);
    }
}