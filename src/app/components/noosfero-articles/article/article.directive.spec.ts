import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Input, provide, Component} from 'ng-forward';

import {ArticleDirective} from './article.directive';

// Instantiate the Builder, this part is different than ng2.
// In ng2 you inject tcb.
const tcb = new TestComponentBuilder();


// Create a component to include your testing component 
@Component({ selector: 'my-test' , template: '<hr />'})
class TestArticleDirective {
    article = { type: 'TinyMceArticle' };
    profile = { name: 'profile-name' };
    constructor(){
    }
}


describe("Article Directive", () => {
    it("receives the article and profile as inputs", done => {
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

});