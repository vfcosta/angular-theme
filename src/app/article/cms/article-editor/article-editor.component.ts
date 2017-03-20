import { SessionService } from './../../../login/session.service';
import {Component, Input, Inject} from 'ng-forward';

@Component({
    selector: 'article-editor',
    template: "not-used"
})
@Inject("$element", "$scope", "$injector", "$compile", "$window", SessionService)
export class ArticleEditorComponent {

    @Input() article: noosfero.Article;
    @Input() profile: noosfero.Profile;
    @Input() path: string;
    options: any;

    constructor(
        private $element: any,
        private $scope: ng.IScope,
        private $injector: ng.auto.IInjectorService,
        private $compile: ng.ICompileService,
        private $window: ng.IWindowService,
        private sessionService: SessionService) { }

    ngOnInit() {
        let articleType = this.article && this.article.type ? this.article.type.replace(/::/, '') : "TextArticle";
        let specificDirective = `${articleType.charAt(0).toLowerCase()}${articleType.substring(1)}Editor`;
        let directiveName = "article-basic-editor";
        if (specificDirective !== "articleEditor" && this.$injector.has(specificDirective + 'Directive')) {
            directiveName = specificDirective.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        }
        let parentId = this.article.parent ? this.article.parent.id : '';
        this.$window['uploadUrl'] = '/api/v1/profiles/' + this.profile.id + '/articles';
        this.$window['listUrl'] = '/api/v1/profiles/' + this.profile.id + '/articles?content_type=Folder,UploadedFile&parent_id=';
        this.$window['privateToken'] = this.sessionService.currentUser().private_token;
        this.options = { filebrowserBrowseUrl: '/ng2-filemanager?editor=CKEditor'};
        this.$element.replaceWith(this.$compile('<' + directiveName + ' [article]="ctrl.article" [options]="ctrl.options"></' + directiveName + '>')(this.$scope));
    }
}
