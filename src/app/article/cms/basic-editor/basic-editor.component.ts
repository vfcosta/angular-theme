import { Component, Input } from '@angular/core';

@Component({
    selector: 'article-basic-editor',
    template: require("app/article/cms/basic-editor/basic-editor.html")
})
export class BasicEditorComponent {

    @Input() article: noosfero.Article;
    @Input() options: any;
}
