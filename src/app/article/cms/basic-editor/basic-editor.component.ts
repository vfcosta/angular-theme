import { Component, Input, Inject } from 'ng-forward';

@Component({
    selector: 'article-basic-editor',
    templateUrl: "app/article/cms/basic-editor/basic-editor.html"
})
@Inject("$stateParams")
export class BasicEditorComponent {

    @Input() article: noosfero.Article;
    options: any;

    constructor(private $stateParams: ng.ui.IStateParamsService) {
        this.options = { filebrowserBrowseUrl: '/ng2-filemanager?editor=CKEditor&profile=' + this.$stateParams["profile"]};
    }
}
