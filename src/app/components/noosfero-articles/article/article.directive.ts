import { bundle, Input, Inject, Component, Directive } from 'ng-forward';
import {NoosferoArticleBlog} from "../blog/blog.component";

@Component({
    selector: 'noosfero-default-article',
    templateUrl: 'app/components/noosfero-articles/article/article.html'
})
export class ArticleView {

    @Input() article: any;
    @Input() profile: any;

}

@Component({
    selector: 'noosfero-article',
    template: 'not-used',
    directives: [ArticleView, NoosferoArticleBlog]
})
@Inject("$element", "$scope", "$injector", "$compile")
export class ArticleDirective {

    @Input() article: any;
    @Input() profile: any;
    directiveName: string;

    ngOnInit() {
        let specificDirective = 'noosfero' + this.article.type;
        this.directiveName = "noosfero-default-article";
        if (this.$injector.has(specificDirective + 'Directive')) {
            this.directiveName = specificDirective.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        }
        this.$element.replaceWith(this.$compile('<' + this.directiveName + ' [article]="ctrl.article" [profile]="ctrl.profile"></' + this.directiveName + '>')(this.$scope));
    }

    constructor(
        private $element: any,
        private $scope: ng.IScope,
        private $injector: ng.auto.IInjectorService,
        private $compile: ng.ICompileService) {

    }
}
