import { bundle, Input, Inject, Component, Directive } from 'ng-forward';

@Component({
    selector: 'noosfero-default-article',
    templateUrl: 'app/components/noosfero-articles/article/article.html',
    providers: ['$injector', '$compile']
})
export class ArticleView {
    constructor() {
        console.log("ARTICLE VIEW");
    }
}

/**
* <noosfero-article></noosfero-article>
*
*
*/

@Directive({
    selector: '[noosfero-article]',
    providers: []
})
@Inject("$element")
@Inject("$scope")
@Inject("$injector")
@Inject("$compile")
export class ArticleDirective {

    constructor($element: any, $scope: ng.IScope, private $injector: ng.auto.IInjectorService, private $compile: ng.ICompileService) {
        var specificDirective = 'noosfero' + $scope["vm"].article.type;
        if ($injector.has(specificDirective + 'Directive')) {
            var directiveName = specificDirective.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            $element.replaceWith($compile('<' + directiveName + ' article="vm.article" profile="vm.profile"></' + directiveName + '>')($scope));
            //$element.html($compile('<' + directiveName + ' article="vm.article" profile="vm.profile"></' + directiveName + '>')(scope))
        } else {
            //TODO
        }
    }
}

//bundle('noosferoApp', ArticleDirective).publish();
