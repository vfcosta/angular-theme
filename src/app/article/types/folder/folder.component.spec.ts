import { ArticleService } from './../../../../lib/ng-noosfero-api/http/article.service';
import { DateFormatPipe } from './../../../shared/pipes/date-format.pipe';
import { MomentModule } from 'angular2-moment';
import { By } from '@angular/platform-browser';
import { FolderComponent } from './folder.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NgPipesModule } from 'ngx-pipes';
import * as helpers from "../../../../spec/helpers";

describe("Folder Component", () => {
    let fixture: ComponentFixture<FolderComponent>;
    let component: FolderComponent;
    let mocks = helpers.getMocks();
    let article1 = <noosfero.Article>{ id: 1, title: 'The article test' };
    let article2 = <noosfero.Article>{ id: 1, title: 'The article test' };
    let articles = [ article1, article2 ];

    beforeEach(async(() => {
        spyOn(mocks.articleService, "getChildren").and.returnValue(Promise.resolve({ data: articles, headers: { get: (attr: String) => { return 2; } }}));
        TestBed.configureTestingModule({
            declarations: [FolderComponent, DateFormatPipe],
            providers: [
                { provide: ArticleService, useValue: mocks.articleService },
                { provide: "amParseFilter", useValue: mocks.amParseFilter }
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [NgPipesModule, MomentModule]
        });
        fixture = TestBed.createComponent(FolderComponent);
        component = fixture.componentInstance;
        component.article = <noosfero.Article>{};
        component.profile = <noosfero.Profile>{};
        component['posts'] = articles;
    }));

    it("renders the folder content", () => {
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('.folder .media')).length).toEqual(2);
    });
});
