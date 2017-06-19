import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { PaginationModule } from 'ngx-bootstrap/ng2-bootstrap';
import { MomentModule } from 'angular2-moment';
import { NgPipesModule } from 'ngx-pipes';
import { By } from '@angular/platform-browser';
import { TranslatePipe } from './../shared/pipes/translate-pipe';
import { DateFormatPipe } from './../shared/pipes/date-format.pipe';
import { ArticleService } from './../../lib/ng-noosfero-api/http/article.service';
import { UiSrefDirective } from '../shared/directives/ui-sref-directive';
import {SearchComponent} from "./search.component";
import * as helpers from "../../spec/helpers";

describe("Components", () => {
    describe("Search Component", () => {

        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<SearchComponent>;
        let component: SearchComponent;

        let stateParams = { query: 'query', per_page: 20 };
        let result = Promise.resolve({
            data: [{ id: 1,
                     identifier: 'article-1',
                     path: 'path',
                     created_at: '',
                     body: '',
                     profile: { identifier: 'profile' } }],
            headers: {
                get: (param: string) => { return 1; }
            }
        });

        beforeEach(async(() => {
            spyOn(mocks.articleService, 'search').and.returnValue(result);

            TestBed.configureTestingModule({
                declarations: [SearchComponent, TranslatePipe, DateFormatPipe, UiSrefDirective],
                providers: [
                    { provide: ArticleService, useValue: mocks.articleService },
                    { provide: "$stateParams", useValue: stateParams },
                    { provide: "$state", useValue: mocks.$state },
                    { provide: "translatorService", useValue: mocks.translatorService },
                    { provide: "$transitions", useValue: mocks.$transitions },
                    { provide: "amParseFilter", useValue: mocks.amParseFilter }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [MomentModule, NgPipesModule, PaginationModule.forRoot(), FormsModule]
            });
            fixture = TestBed.createComponent(SearchComponent);
            component = fixture.componentInstance;
        }));

        it("load first page with search results", () => {
            fixture.detectChanges();
            expect(mocks.articleService.search).toHaveBeenCalledWith({ query: 'query', per_page: 20, page: 0 });
        });

        it("display search results", () => {
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css(".result")).length).toEqual(1);
        });
    });
});
