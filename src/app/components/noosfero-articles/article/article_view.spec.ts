
import {Input, provide, Component} from 'ng-forward';
import {ArticleView, ArticleDefaultView} from './article_view';

import {createComponentFromClass, quickCreateComponent} from "../../../../spec/helpers.ts";

// this htmlTemplate will be re-used between the container components in this spec file 
const htmlTemplate: string = '<noosfero-article [article]="ctrl.article" [profile]="ctrl.profile"></noosfero-article>';


describe("Components", () => {

    describe("ArticleView Component", () => {

        // the karma preprocessor html2js transform the templates html into js files which put
        // the templates to the templateCache into the module templates
        // we need to load the module templates here as the template for the 
        // component Noosfero ArtileView will be load on our tests
        beforeEach(angular.mock.module("templates"));

        it("renders the default component when no specific component is found", (done: Function) => {
            // Creating a container component (ArticleContainerComponent) to include 
            // the component under test (ArticleView)  
            @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [ArticleView] })
            class ArticleContainerComponent {
                article = { type: 'anyArticleType' };
                profile = { name: 'profile-name' };
                constructor() {
                }
            }

            createComponentFromClass(ArticleContainerComponent).then((fixture) => {
                // and here we can inspect and run the test assertions

                // gets the children component of ArticleContainerComponent 
                let articleView: ArticleView = fixture.debugElement.componentViewChildren[0].componentInstance;

                // and checks if the article View rendered was the Default Article View
                expect(articleView.constructor.prototype).toEqual(ArticleDefaultView.prototype);

                // done needs to be called (it isn't really needed, as we can read in
                // here (https://github.com/ngUpgraders/ng-forward/blob/master/API.md#createasync)
                // because createAsync in ng-forward is not really async, but as the intention 
                // here is write tests in angular 2 ways, this is recommended
                done();
            });

        });

        it("receives the article and profile as inputs", (done: Function) => {

            // Creating a container component (ArticleContainerComponent) to include 
            // the component under test (ArticleView)  
            @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [ArticleView] })
            class ArticleContainerComponent {
                article = { type: 'anyArticleType' };
                profile = { name: 'profile-name' };
                constructor() {
                }
            }

            // uses the TestComponentBuilder instance to initialize the component
            createComponentFromClass(ArticleContainerComponent).then((fixture) => {
                // and here we can inspect and run the test assertions 
                let articleView: ArticleView = fixture.debugElement.componentViewChildren[0].componentInstance;

                // assure the article object inside the ArticleView matches
                // the provided through the parent component
                expect(articleView.article.type).toEqual("anyArticleType");
                expect(articleView.profile.name).toEqual("profile-name");

                // done needs to be called (it isn't really needed, as we can read in
                // here (https://github.com/ngUpgraders/ng-forward/blob/master/API.md#createasync)
                // because createAsync in ng-forward is not really async, but as the intention 
                // here is write tests in angular 2 ways, this is recommended
                done();
            });
        });


        it("renders a article view which matches to the article type", done => {
            // NoosferoTinyMceArticle component created to check if it will be used
            // when a article with type 'TinyMceArticle' is provided to the noosfero-article (ArticleView)
            // *** Important *** - the selector is what ng-forward uses to define the name of the directive provider
            @Component({ selector: 'noosfero-tiny-mce-article', template: "<h1>TinyMceArticle</h1>" })
            class TinyMceArticleView {
                @Input() article: any;
                @Input() profile: any;
            }

            // Creating a container component (ArticleContainerComponent) to include our NoosferoTinyMceArticle
            @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [ArticleView, TinyMceArticleView] })
            class CustomArticleType {
                article = { type: 'TinyMceArticle' };
                profile = { name: 'profile-name' };
                constructor() {
                }
            }
            createComponentFromClass(CustomArticleType).then(fixture => {
                let myComponent: CustomArticleType = fixture.componentInstance;
                expect(myComponent.article.type).toEqual("TinyMceArticle");
                expect(fixture.debugElement.componentViewChildren[0].text()).toEqual("TinyMceArticle");
                done();
            });
        });

    });
});