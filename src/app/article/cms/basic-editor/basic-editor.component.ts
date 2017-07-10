import { Component, Input } from '@angular/core';

@Component({
    selector: 'article-basic-editor',
    templateUrl: './basic-editor.html',
    styleUrls: ['./basic-editor.scss']
})
export class BasicEditorComponent {

    @Input() article: noosfero.Article;
    @Input() options: any;
}
