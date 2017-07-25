import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../shared/services/translator.service';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SearchFormComponent } from './search-form.component';
import * as helpers from '../../../spec/helpers';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Search Form Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<SearchFormComponent>;
        let component: SearchFormComponent;

        beforeEach(async(() => {
            spyOn(mocks.router, "navigate");
            TestBed.configureTestingModule({
                declarations: [SearchFormComponent],
                providers: [
                    { provide: TranslatorService, useValue: mocks.translatorService },
                    { provide: ActivatedRoute, useValue: mocks.route },
                    { provide: Router, useValue: mocks.router }
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [FormsModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(SearchFormComponent);
            component = fixture.componentInstance;
        }));

        it("render a button that open a search query field", () => {
            expect(fixture.debugElement.queryAll(By.css(".btn-search-nav")).length).toEqual(1);
        });

        it("go to search page when click on search button", () => {
            component.query = 'query';
            component.search();
            expect(TestBed.get(Router).navigate).toHaveBeenCalledWith(['/search'], { queryParams: { query: 'query' } });
        });
    });
});
