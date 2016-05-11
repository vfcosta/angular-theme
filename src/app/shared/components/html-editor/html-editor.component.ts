import {Component, Input} from "ng-forward";

@Component({
    selector: 'html-editor',
    templateUrl: "app/shared/components/html-editor/html-editor.html",
})
export class HtmlEditorComponent {

    @Input() options: any = {};
    @Input() value: any;
}
