import { TranslatePipe } from './../../shared/pipes/translate-pipe';
import { InviteComponent } from './invite.component';
import * as helpers from "../../../spec/helpers";
import { PersonService } from "../../../lib/ng-noosfero-api/http/person.service";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { TypeaheadModule } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/of";

describe("Components", () => {
    describe("Invite Component", () => {
        let mocks = helpers.getMocks();
        let peopleToInvite = [<noosfero.Person>{ "id": 1, "name": "Person 1" }, <noosfero.Person>{ "id": 3, "name": "Person 3" }];
        let fixture: ComponentFixture<InviteComponent>;
        let component: InviteComponent;

        beforeEach(async(() => {
            spyOn(mocks.profileService, 'getCurrentProfile').and.callThrough();
            spyOn(mocks.communityService, 'sendInvitations');
            spyOn(mocks.personService, 'search').and.callThrough();

            TestBed.configureTestingModule({
                declarations: [InviteComponent, TranslatePipe],
                providers: [
                    { provide: "personService", useValue: mocks.personService },
                    { provide: "profileService", useValue: mocks.profileService },
                    { provide: "communityService", useValue: mocks.communityService },
                    { provide: "translatorService", useValue: mocks.translatorService }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [NgPipesModule, TypeaheadModule.forRoot(), FormsModule]
            });
            fixture = TestBed.createComponent(InviteComponent);
            component = fixture.componentInstance;
            component.peopleToInvite = peopleToInvite;
        }));

        it("verify get current profile is called ", async(() => {
            component.ngOnInit();
            expect(mocks.profileService.getCurrentProfile).toHaveBeenCalled();
        }));

        it("verify the profile is defined on initialization", fakeAsync(() => {
            component.ngOnInit();
            tick();
            expect(component.profile).toEqual(mocks.profile);
        }));

        it("call community service on sendInvitations", fakeAsync(() => {
            component.ngOnInit();
            tick();
            component.sendInvitations();
            tick();
            expect(mocks.communityService.sendInvitations).toHaveBeenCalledWith(mocks.profile.id, peopleToInvite);
        }));

        it("should not mark to invite null person", () => {
            component.markToInvite(null);
            expect(component.peopleToInvite).toEqual(peopleToInvite);
        });

        it("should not mark to invite None element", () => {
            let person = <noosfero.Person>{ name: 'None' };
            component.markToInvite(person);
            expect(component.peopleToInvite).toEqual(peopleToInvite);
        });

        it("should mark to invite a new person", () => {
            let person = <noosfero.Person>{ id: 100, name: 'Someone' };
            component.markToInvite(person);
            let expected = peopleToInvite;
            expected.push(person);
            expect(component.peopleToInvite).toEqual(expected);
        });

        it("should not mark to invite a repeated person", () => {
            component.markToInvite(peopleToInvite[0]);
            expect(component.peopleToInvite).toEqual(peopleToInvite);
        });

        it("should remove a marked person of inviation list", () => {
            component.unmarkToInvite(peopleToInvite[1]);
            let expected = peopleToInvite;
            expected.pop();
            expect(component.peopleToInvite).toEqual(expected);
        });

        it("should nothing happen if an unexisting person be unmarked", () => {
            let person = <noosfero.Person>{ id: 100, name: 'Someone' };
            component.unmarkToInvite(person);
            expect(component.peopleToInvite).toEqual(peopleToInvite);
        });

        it("should call personService in search method passing key", fakeAsync(() => {
            let key = 'some';
            component.searchPerson(key);
            tick();

            let filters = { search: key, per_page: 10 };
            expect(mocks.personService.search).toHaveBeenCalledWith(filters);
        }));

        it("should search return list of people", (done) => {
            component.searchPerson('').subscribe((data) => {
                expect(data).toEqual([mocks.profile]);
                done();
            });
        });

        it("should search return a list with none element if no people is found", fakeAsync(() => {
            component['personService'].search = jasmine.createSpy("search").and.returnValue(Observable.of([]));
            component.searchPerson('').subscribe((data) => {
                expect(data).toEqual([{ name: 'profile.members.invitations.none' }]);
            });
        }));

    });

});
