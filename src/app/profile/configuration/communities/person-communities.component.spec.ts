import { PersonCommunitiesComponent } from './person-communities.component';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PersonService } from "../../../../lib/ng-noosfero-api/http/person.service";
import * as helpers from "../../../../spec/helpers";

describe("Components", () => {

    describe("Person Communities Component", () => {
        let fixture: ComponentFixture<PersonCommunitiesComponent>;
        let component: PersonCommunitiesComponent;
        let personService = jasmine.createSpyObj("PersonService", ["getCommunities"]);
        personService.getCommunities = jasmine.createSpy("getCommunities").and.returnValue(Promise.resolve({ headers: () => {} }));
        let stateParams = {};

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [PersonCommunitiesComponent, TranslatePipe],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: "personService", useValue: personService },
                    { provide: "$stateParams", useValue: stateParams },
                    { provide: "translatorService", useValue: helpers.mocks.translatorService }
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(PersonCommunitiesComponent);
                component = fixture.componentInstance;
                component.profile = <noosfero.Profile>{ id: 1 };
            });
        }));

        it("load first page of communities on init", () => {
            fixture.detectChanges();
            expect(personService.getCommunities).toHaveBeenCalledWith(1, { per_page: 20, page: 1, search: undefined });
        });

        it("load communities when save", () => {
            component.searchCommunities();
            expect(personService.getCommunities).toHaveBeenCalledWith(1, { per_page: 20, page: 1, search: undefined });
        });

        it("search for communities when change search text", (fakeAsync(() => {
            component.searchChanged.next("john");
            tick(300);
            expect(component.search).toEqual("john");
            expect(personService.getCommunities).toHaveBeenCalledWith(1, { per_page: 20, page: 1, search: "john" });
        })));
    });
});