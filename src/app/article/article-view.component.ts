import { Input, Inject, Component, Directive } from '@angular/core';
import { NotificationService } from "./../shared/services/notification.service";
import {PermissionDirective} from '../shared/components/permission/permission.directive';

/**
 * @ngdoc controller
 * @name ArticleView
 * @description
 *  A dynamic view for articles. It uses the article type to replace
 * the default template with the custom article directive.
 */
@Component({
    selector: 'noosfero-article',
    template: require('app/article/article-view.html'),
})
export class ArticleViewComponent {

    @Input() article: noosfero.Article;
    @Input() profile: noosfero.Profile;

}
