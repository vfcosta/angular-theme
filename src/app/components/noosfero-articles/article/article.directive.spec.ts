import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Input, provide, Component} from 'ng-forward';

import {ArticleDirective} from './article.directive';

// Instantiate the Builder, this part is different than ng2.
// In ng2 you inject tcb.
const tcb = new TestComponentBuilder();

// this htmlTemplate will be re-used between the container components in this spec file 
const htmlTemplate: string = '<noosfero-article [article]="ctrl.article" [profile]="ctrl.profile"></noosfero-article>';


describe("Article Directive", () => {
    
    
    // the karma preprocessor html2js transform the templates html into js files which put
    // the templates to the templateCache into the module templates
    // we need to load the module templates here as the template for the 
    // component NoosferoArtileDirective will be load on our tests
    beforeEach(angular.mock.module("templates"));

    it("receives the article and profile as inputs", done => {

        // Creating a container component (ArticleContainerComponent) to include 
        // the component under test (ArticleDirective)  
        @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [ArticleDirective] })
        class ArticleContainerComponent {
            article = { type: 'anyArticleType' };
            profile = { name: 'profile-name' };
            constructor() {
            }
        }

        // uses the TestComponentBuilder instance to initialize the component
        tcb.createAsync(ArticleContainerComponent).then((fixture) => {
            // and here we can inspect and run the test assertions 
            let myComponent: ArticleContainerComponent = fixture.componentInstance;

            console.log(myComponent);

            // assure the article object inside the ArticleDirective matches
            // the provided through the parent component
            expect(myComponent.article.type).toEqual("anyArticleType");
            expect(myComponent.profile.name).toEqual("profile-name");

            myComponent.metodoAsync(() => {
                done();
            });
            // done needs to be called (it isn't really needed, as we can read in
            // here (https://github.com/ngUpgraders/ng-forward/blob/master/API.md#createasync)
            // because createAsync in ng-forward is not really async, but as the intention 
            // here is write tests in angular 2 ways, this is recommended
            done();
        });
    });


    it("renders a directive which matches to the article type", done => {
        // NoosferoTinyMceArticle component created to check if it will be used
        // when a article with type 'TinyMceArticle' is provided to the noosfero-article (ArticleDirective)
        // *** Important *** - the selector is what ng-forward uses to define the name of the directive provider
        @Component({ selector: 'noosfero-tiny-mce-article', template: "<h1>TinyMceArticle</h1>" })
        class NoosferoTinyMceArticle {
            @Input() article: any;
            @Input() profile: any;
        }

        // Creating a container component (ArticleContainerComponent) to include our NoosferoTinyMceArticle
        @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [ArticleDirective, NoosferoTinyMceArticle] })
        class CustomArticleType {
            article = { type: 'TinyMceArticle' };
            profile = { name: 'profile-name' };
            constructor() {
            }
        }
        tcb.createAsync(CustomArticleType).then(fixture => {
            let myComponent: CustomArticleType = fixture.componentInstance;
            expect(myComponent.article.type).toEqual("TinyMceArticle");
            expect(fixture.debugElement.componentViewChildren[0].text()).toEqual("TinyMceArticle");
            done();
        });
    });

});