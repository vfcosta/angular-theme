import { bundle, Input, Inject, Component, Directive } from 'ng-forward';
import {ArticleService} from "./../../lib/ng-noosfero-api/http/article.service";
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
    template: 'not-used',
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
