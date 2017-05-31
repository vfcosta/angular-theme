import {Component, Input} from "@angular/core";

@Component({
    selector: 'article-basic-options',
    template: require("app/article/cms/basic-options/basic-options.html")
})
export class BasicOptionsComponent {

    @Input() article: noosfero.Article;

}
