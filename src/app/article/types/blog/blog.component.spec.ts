import { ArticleService } from './../../../../lib/ng-noosfero-api/http/article.service';
import { By } from '@angular/platform-browser';
import { ArticleBlogComponent } from './blog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NgPipesModule } from 'ngx-pipes';
import * as helpers from '../../../../spec/helpers';

describe("Blog Component", () => {
    let fixture: ComponentFixture<ArticleBlogComponent>;
    let component: ArticleBlogComponent;
    const mocks = helpers.getMocks();
    const article1 = <noosfero.Article>{ id: 1, title: 'The article test' };
    const article2 = <noosfero.Article>{ id: 1, title: 'The article test' };
    const articles = [ article1, article2 ];

    beforeEach(async(() => {
        spyOn(mocks.articleService, "getChildren").and.returnValue(Promise.resolve(null));
        TestBed.configureTestingModule({
            declarations: [ArticleBlogComponent],
            providers: [
                { provide: ArticleService, useValue: mocks.articleService },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [NgPipesModule]
        });
        fixture = TestBed.createComponent(ArticleBlogComponent);
        component = fixture.componentInstance;
        component['posts'] = articles;
    }));

    it("renders the blog content", () => {
        expect(fixture.debugElement.queryAll(By.css('div.blog')).length).toEqual(1);
    });

    it("verify the blog data", () => {
        expect(component["posts"][0]).toEqual(jasmine.objectContaining(article1));
    });
});
