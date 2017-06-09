import { By } from '@angular/platform-browser';
import { ArticleViewComponent } from './article-view.component';
import * as helpers from "../../spec/helpers";
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("ArticleView Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<ArticleViewComponent>;
        let component: ArticleViewComponent;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ArticleViewComponent],
                schemas: [NO_ERRORS_SCHEMA],
            });
            fixture = TestBed.createComponent(ArticleViewComponent);
            component = fixture.componentInstance;
        }));

        it("renders the default component when no specific component is found", () => {
            component.article = <noosfero.Article>{ type: 'anyArticleType' };
            component.profile = <noosfero.Profile>{ name: 'profile-name' };
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css("noosfero-default-article")).length).toEqual(1);
        });

        it("renders a article view which matches to the article type", () => {
            component.article = <noosfero.Article>{ type: 'Blog' };
            component.profile = <noosfero.Profile>{ name: 'profile-name' };
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css("noosfero-blog")).length).toEqual(1);
        });
    });
});
