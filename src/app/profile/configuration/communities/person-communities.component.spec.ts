import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../shared/services/translator.service';
import { PersonCommunitiesComponent } from './person-communities.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PersonService } from '../../../../lib/ng-noosfero-api/http/person.service';
import * as helpers from '../../../../spec/helpers';

describe("Components", () => {
    describe("Person Communities Component", () => {
        let fixture: ComponentFixture<PersonCommunitiesComponent>;
        let component: PersonCommunitiesComponent;
        const personService = jasmine.createSpyObj("PersonService", ["getCommunities"]);
        personService.getCommunities = jasmine.createSpy("getCommunities").and.returnValue(Promise.resolve({ headers: { get: () => { } } }));
        const stateParams = {};
        const mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule, FormsModule, TranslateModule.forRoot()],
                declarations: [PersonCommunitiesComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: PersonService, useValue: personService },
                    { provide: ActivatedRoute, useValue: mocks.route },
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ]
            });
            fixture = TestBed.createComponent(PersonCommunitiesComponent);
            component = fixture.componentInstance;
            component.profile = <noosfero.Profile>{ id: 1 };
        }));

        it("load first page of communities on init", () => {
            fixture.detectChanges();
            expect(personService.getCommunities).toHaveBeenCalledWith(1, { per_page: 20, page: 1, search: undefined, order: 'name ASC' });
        });

        it("load communities when save", () => {
            component.searchCommunities();
            expect(personService.getCommunities).toHaveBeenCalledWith(1, { per_page: 20, page: 1, search: undefined, order: 'name ASC' });
        });

        it("search for communities when change search text", (fakeAsync(() => {
            component.searchChanged.next("john");
            tick(300);
            expect(component.search).toEqual("john");
            expect(personService.getCommunities).toHaveBeenCalledWith(1, { per_page: 20, page: 1, search: "john", order: 'name ASC' });
        })));

        it("has default display style equal to *card*", () => {
            expect(component.getDisplayStyle()).toEqual('card');
        });

    });
});
