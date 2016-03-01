// let oldDefine = Object.defineProperties;
// 
// Object.defineProperties = function(object, properties){
//     let filteredProps = {};
//     let currentProperties = Object.getOwnPropertyNames(object);
//     for (let i = 0; i < currentProperties.length; i++) {
//         let prop = currentProperties[i];
//         if(currentProperties.indexOf(prop) < 0){
//             filteredProps[prop] = properties[prop];
//         }
//     }
//     oldDefine(object, <any>filteredProps);
// };

import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Input, provide, Component} from 'ng-forward';

import {ArticleDirective} from './article.directive';






// Instantiate the Builder, this part is different than ng2.
// In ng2 you inject tcb.
const tcb = new TestComponentBuilder();


// Create your test bed
@Component({ selector: 'my-test' , template: '<hr />'})
class TestArticleDirective {
    article = { type: 'TinyMceArticle' };
    profile = { name: 'profile-name' };
    constructor(){
            
    }
}



describe("Article Directive", () => {
    it("does something", done => {
        let html = '<noosfero-article [article]="ctr.article" [profile]="ctrl.profile"></noosfero-article>';
        tcb
            .overrideTemplate(TestArticleDirective, html)
            .createAsync(TestArticleDirective).then(fixture => {
                let myComponent: ArticleDirective = fixture.componentInstance;
                expect(myComponent.article.type).toEqual("TinyMceArticle");
                expect(myComponent.profile.name).toEqual("profile-name");
                console.log(fixture.debugElement);
                done();
            });
    });

    // let html = '<noosfero-article [profile]=profile [artcile]=article></noosfero-article>';

    // let noosferoApp: ng.IModule;
    // let articleDirective: ArticleDirective;
    // let $scope: ng.IScope;
    // let element: ng.IAugmentedJQuery;
    // beforeEach(angular.mock.module("noosferoApp"));

    // beforeEach(inject(function($controller: ng.IControllerService, $injector: ng.auto.IInjectorService, $rootScope, $q, $compile, $location, toastr) {
    //     let routeParams = {};
    //     let $scope: ng.IScope = $rootScope.$new();
    //     (<any>$scope).ctrl = {
    //         article: {
    //             type: 'article'
    //         },
    //         profile: { }
    //     };
    //     element = getCompiledElement($scope, $compile);
    //     //let element = angular.element('<noosfero-article article="ctrl.article" [profile]="ctrl.profile"></noosfero-article>');
    //     //articleDirective = new ArticleDirective(element, $scope, $injector, $compile);
    //     console.log(articleDirective);
    // }));

    // it("renders accordly the article type", (done) => {
    //     expect(1 + 1).toEqual(2);
    //     console.log(noosferoApp);
    //     done();
    // });

    // function getCompiledElement($scope, $compile) {
    //     let element = angular.element('<noosfero-article [article]="ctrl.article" [profile]="ctrl.profile"></noosfero-article>');
    //     let compiledElement = $compile(element)($scope);
    //     $scope.$digest();
    //     return compiledElement;
    // }
});