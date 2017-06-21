import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { PersonFriendsComponent } from './person-friends.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PersonService } from "../../../../lib/ng-noosfero-api/http/person.service";
import * as helpers from "../../../../spec/helpers";

describe("Components", () => {

    describe("Person Friends Component", () => {
        let fixture: ComponentFixture<PersonFriendsComponent>;
        let component: PersonFriendsComponent;
        let personService = jasmine.createSpyObj("PersonService", ["getFriends"]);
        personService.getFriends = jasmine.createSpy("getFriends").and.returnValue(Promise.resolve({ headers: () => {} }));
        let stateParams = {};

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [PersonFriendsComponent, TranslatePipe],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: "personService", useValue: personService },
                    { provide: "$stateParams", useValue: stateParams },
                    { provide: "translatorService", useValue: helpers.mocks.translatorService }
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(PersonFriendsComponent);
                component = fixture.componentInstance;
                component.profile = <noosfero.Profile>{ id: 1 };
            });
        }));

        it("load first page of friends on init", () => {
            fixture.detectChanges();
            expect(personService.getFriends).toHaveBeenCalledWith(1, { per_page: 20, page: 1, search: undefined, order: 'name ASC' });
        });

        it("load friends when save", () => {
            component.searchFriends();
            expect(personService.getFriends).toHaveBeenCalledWith(1, { per_page: 20, page: 1, search: undefined, order: 'name ASC' });
        });

        it("search for friends when change search text", (fakeAsync(() => {
            component.searchChanged.next("john");
            tick(300);
            expect(component.search).toEqual("john");
            expect(personService.getFriends).toHaveBeenCalledWith(1, { per_page: 20, page: 1, search: "john", order: 'name ASC' });
        })));
        
    });
});
