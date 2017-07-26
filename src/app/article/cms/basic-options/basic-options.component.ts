import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'article-basic-options',
    templateUrl: './basic-options.html',
    styleUrls: ['./basic-options.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BasicOptionsComponent {

    @Input() article: noosfero.Article;

}
