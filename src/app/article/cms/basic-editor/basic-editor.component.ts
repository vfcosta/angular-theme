import {Component, Input} from 'ng-forward';

@Component({
    selector: 'article-basic-editor',
    templateUrl: "app/article/cms/basic-editor/basic-editor.html"
})
export class BasicEditorComponent {

    @Input() article: noosfero.Article;

}
