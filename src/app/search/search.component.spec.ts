import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../shared/services/translator.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { PaginationModule } from 'ngx-bootstrap';
import { MomentModule } from 'angular2-moment';
import { NgPipesModule } from 'ngx-pipes';
import { By } from '@angular/platform-browser';
import { DateFormatPipe } from './../shared/pipes/date-format.pipe';
import { ArticleService } from './../../lib/ng-noosfero-api/http/article.service';
import {SearchComponent} from './search.component';
import * as helpers from '../../spec/helpers';

describe("Components", () => {
    describe("Search Component", () => {
        const mocks = helpers.getMocks();
        let fixture: ComponentFixture<SearchComponent>;
        let component: SearchComponent;
        const result = Promise.resolve({
            data: [{ id: 1,
                     identifier: 'article-1',
                     path: 'path',
                     created_at: '',
                     body: '',
                     profile: { identifier: 'profile' } }],
            headers: {
                get: (param: string) => 1
            }
        });

        beforeEach(async(() => {
            spyOn(mocks.articleService, 'search').and.returnValue(result);
            mocks.route.snapshot.queryParams = { query: 'query', per_page: 20 };
            TestBed.configureTestingModule({
                declarations: [SearchComponent, DateFormatPipe],
                providers: [
                    { provide: ArticleService, useValue: mocks.articleService },
                    { provide: TranslatorService, useValue: mocks.translatorService },
                    { provide: ActivatedRoute, useValue: mocks.route }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [RouterTestingModule, MomentModule, NgPipesModule, PaginationModule.forRoot(), FormsModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(SearchComponent);
            component = fixture.componentInstance;
        }));

        it("load first page with search results", () => {
            fixture.detectChanges();
            expect(mocks.articleService.search).toHaveBeenCalledWith({ query: 'query', tag: undefined, per_page: 20, page: 0 });
        });

        it("display search results", () => {
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css(".result")).length).toEqual(1);
        });
    });
});
