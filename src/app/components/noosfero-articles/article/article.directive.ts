import { Input, Inject, Component, Directive } from 'ng-forward';

@Component({
    selector: 'noosfero-default-article',
    templateUrl: 'app/components/noosfero-articles/article/article.html',
    providers: ['$injector', '$compile']
})
export class ArticleView {

}

/**
* <noosfero-article></noosfero-article>
*
*
*/
@Directive({
    selector: 'noosfero-article',
    providers: ['$injector', '$compile'],

})
@Inject('$element')
@Inject('$scope')
export class ArticleDirective {

    @Input("article")
    article: any;

    @Input("profile")
    profile: any;

    constructor($element: any, $scope: ng.IScope, private $injector: ng.auto.IInjectorService, private $compile: ng.ICompileService) {
        console.log('ARTICLE DIRECTIVE');
        var specificDirective = 'noosfero' + this.article.type;
        if ($injector.has(specificDirective + 'Directive')) {
            var directiveName = specificDirective.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            $element.replaceWith($compile('<' + directiveName + ' article="vm.article" profile="vm.profile"></' + directiveName + '>')($scope));
            //$element.html($compile('<' + directiveName + ' article="vm.article" profile="vm.profile"></' + directiveName + '>')(scope))
        } else {
            //TODO
        }
    }


}
