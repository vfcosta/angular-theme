import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Input, provide, Component} from 'ng-forward';

import {ArticleDirective} from './article.directive';

// Instantiate the Builder, this part is different than ng2.
// In ng2 you inject tcb.
const tcb = new TestComponentBuilder();


let html = '<noosfero-article [article]="ctr.article" [profile]="ctrl.profile"></noosfero-article>';

// Create a component to include your testing component 
@Component({ selector: 'my-test', template: html, directives: [ArticleDirective] })
class TestArticleDirective {
    article = { type: 'TinyMceArticle' };
    profile = { name: 'profile-name' };
    constructor() {
    }
}


describe("Article Directive", () => {
    it("receives the article and profile as inputs", done => {
        tcb
            .createAsync(TestArticleDirective).then(fixture => {
                let myComponent: ArticleDirective = fixture.componentInstance;
                expect(myComponent.article.type).toEqual("TinyMceArticle");
                expect(myComponent.profile.name).toEqual("profile-name");
                console.log(fixture.debugElement);
                done();
            });
    });

    it("renders a directive corresponding to the article type", done => {

        @Component({ selector: 'noosfero-TinyMceArticle', template: "<h1>custom component</h1>" })
        class CustomArticleComponent {

        }

        @Component({ selector: 'custom-article-type-test', template: html, directives: [ArticleDirective, CustomArticleComponent] })
        class CustomArticleType {
            article = { type: 'TinyMceArticle' };
            profile = { name: 'profile-name' };
            constructor() {
            }
        }
        tcb
            .createAsync(CustomArticleType).then(fixture => {
                let myComponent: CustomArticleType = fixture.componentInstance;
                expect(myComponent.article.type).toEqual("TinyMceArticle");
                expect(myComponent.profile.name).toEqual("profile-name");
                console.log(fixture.debugElement);
                done();
            });
    });

});