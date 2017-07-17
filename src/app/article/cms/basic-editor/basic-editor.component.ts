import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'article-basic-editor',
    templateUrl: './basic-editor.html',
    styleUrls: ['./basic-editor.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BasicEditorComponent {

    @Input() article: noosfero.Article;
    @Input() options: any;
}
