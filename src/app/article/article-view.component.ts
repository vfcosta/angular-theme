import { Input, Inject, Component, Directive, ViewEncapsulation } from '@angular/core';

/**
 * @ngdoc controller
 * @name ArticleView
 * @description
 *  A dynamic view for articles. It uses the article type to replace
 * the default template with the custom article directive.
 */
@Component({
    selector: 'noosfero-article',
    templateUrl: './article-view.html',
    styleUrls: ['article.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ArticleViewComponent {

    @Input() article: noosfero.Article;
    @Input() profile: noosfero.Profile;

}
