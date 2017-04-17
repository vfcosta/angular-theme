import { PopoverModule } from 'ngx-bootstrap';
import { DateFormatPipe } from './../../../shared/pipes/date-format.ng2.filter';
import { MomentModule } from 'angular2-moment';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { ProfileListEditionComponent } from './profile-list-edition.component';
import { By } from '@angular/platform-browser';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as helpers from "../../../../spec/helpers";

export class MockDateFormatPipe {
    transform() {
        return '2016/03/10 10:46:47';
    }
}

describe("Components", () => {
    describe("Profile List Edition Component", () => {
        let fixture: ComponentFixture<ProfileListEditionComponent>;
        let component: ProfileListEditionComponent;
        let state = jasmine.createSpyObj("$state", ["href"]);

        let owner = { id: 1, identifier: 'owner', type: 'Community' };
        let profile = { id: 2, identifier: 'profile' };

        let roleService = jasmine.createSpyObj("roleService", ["getByProfile", "assign"]);
        roleService.assign = jasmine.createSpy("assign").and.returnValue(helpers.mocks.promiseResultTemplate());
        roleService.getByProfile = jasmine.createSpy("getByProfile").and.returnValue(helpers.mocks.promiseResultTemplate({ data: [{ id: 10 }, { id: 11 }] }));
        let amParseFilter = () => {
            return {
                toISOString: () => {}
            };
        };

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ProfileListEditionComponent, TranslatePipe, DateFormatPipe],
                providers: [
                    { provide: "roleService", useValue: roleService },
                    { provide: "notificationService", useValue: helpers.mocks.notificationService },
                    { provide: "translatorService", useValue: helpers.mocks.translatorService },
                    { provide: "amParseFilter", useValue: amParseFilter }
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [MomentModule, PopoverModule.forRoot()]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ProfileListEditionComponent);
                component = fixture.componentInstance;
                component.profile = <noosfero.Profile>profile;
                component.owner = <noosfero.Profile>owner;
            });
        }));

        it("render the edit button", () => {
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('.edit-button')).length).toEqual(1);
        });

        it("not render the edit button when owner is not a community ", () => {
            component.owner = <noosfero.Profile>{ id: 3, identifier: 'owner', type: 'Person' };
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('.edit-button')).length).toEqual(0);
        });

        it("load roles", () => {
            component.loadRoles();
            expect(component.roles).toEqual([{ id: 10 }, { id: 11 }]);
        });
    });

});
