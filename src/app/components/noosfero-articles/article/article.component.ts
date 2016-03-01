import { bundle, Input, Inject, Component, Directive } from 'ng-forward';
import {NoosferoArticleBlog} from "../blog/blog.component";

@Component({
    selector: 'noosfero-article',
    templateUrl: 'app/components/noosfero-articles/article/article.html',
    directives: [NoosferoArticleBlog]
})
@Inject("$element", "$scope", "$injector", "$compile")
export class ArticleComponent {

    @Input() article: any;
    @Input() profile: any;

    ngOnInit() {
        let specificDirective = 'noosfero' + this.article.type;
        if (this.$injector.has(specificDirective + 'Directive')) {
            let directiveName = specificDirective.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            this.$element.replaceWith(this.$compile('<' + directiveName + ' [article]="ctrl.article" [profile]="ctrl.profile"></' + directiveName + '>')(this.$scope));
        }
    }

    constructor(private $element: any, private $scope: ng.IScope, private $injector: ng.auto.IInjectorService, private $compile: ng.ICompileService) {

    }
}
