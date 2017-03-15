import {Component, Input} from '@angular/core';

@Component({
    selector: 'html-editor',
    template: require("app/shared/components/html-editor/html-editor.html"),
})
export class HtmlEditorComponent {

    @Input() options: any = { };
    @Input() object: any;
    @Input() attribute: string;
}
