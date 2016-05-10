import {Component, Input} from 'ng-forward';

@Component({
    selector: 'article-basic-options',
    templateUrl: "app/article/cms/basic-options/basic-options.html"
})
export class BasicOptionsComponent {

    @Input() article: noosfero.Article;

}
