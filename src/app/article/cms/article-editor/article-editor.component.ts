import {Component, Input, Inject} from 'ng-forward';

@Component({
    selector: 'article-editor',
    template: "not-used"
})
@Inject("$element", "$scope", "$injector", "$compile")
export class ArticleEditorComponent {

    @Input() article: noosfero.Article;

    constructor(
        private $element: any,
        private $scope: ng.IScope,
        private $injector: ng.auto.IInjectorService,
        private $compile: ng.ICompileService) { }

    ngOnInit() {
        let articleType = this.article && this.article.type ? this.article.type.replace(/::/, '') : "TextArticle";
        let specificDirective = `${articleType.charAt(0).toLowerCase()}${articleType.substring(1)}Editor`;
        let directiveName = "article-basic-editor";
        if (specificDirective !== "articleEditor" && this.$injector.has(specificDirective + 'Directive')) {
            directiveName = specificDirective.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        }
        this.$element.replaceWith(this.$compile('<' + directiveName + ' [article]="ctrl.article"></' + directiveName + '>')(this.$scope));
    }
}
