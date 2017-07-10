import {Component, Input} from '@angular/core';

@Component({
    selector: 'article-basic-options',
    templateUrl: './basic-options.html',
    styleUrls: ['./basic-options.scss']
})
export class BasicOptionsComponent {

    @Input() article: noosfero.Article;

}
