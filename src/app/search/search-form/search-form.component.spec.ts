import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from './../../shared/pipes/translate-pipe';
import { SearchFormComponent } from "./search-form.component";
import * as helpers from "../../../spec/helpers";
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Search Form Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<SearchFormComponent>;
        let component: SearchFormComponent;

        beforeEach(async(() => {
            spyOn(mocks.$state, "go");
            TestBed.configureTestingModule({
                declarations: [SearchFormComponent, TranslatePipe],
                providers: [
                    { provide: "translatorService", useValue: mocks.translatorService },
                    { provide: "$state", useValue: mocks.$state }
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [FormsModule]
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
            expect(TestBed.get('$state').go).toHaveBeenCalledWith('main.environment.search', { query: 'query' });
        });
    });
});
