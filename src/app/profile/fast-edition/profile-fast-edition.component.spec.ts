import { ProfileFastEditionComponent } from './profile-fast-edition.component';
import { TranslatePipe } from './../../shared/pipes/translate-pipe';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";
import * as helpers from "../../../spec/helpers";

describe("Components", () => {

    describe("Profile Fast Edition Component", () => {
        let fixture: ComponentFixture<ProfileFastEditionComponent>;
        let component: ProfileFastEditionComponent;
        let profileService = jasmine.createSpyObj("profileService", ["update"]);
        profileService.update = jasmine.createSpy("update").and.returnValue(Promise.resolve({}));

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [ProfileFastEditionComponent, TranslatePipe],
                providers: [
                    { provide: "profileService", useValue: profileService },
                    { provide: "notificationService", useValue: helpers.mocks.notificationService },
                    { provide: "translatorService", useValue: helpers.mocks.translatorService }
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ProfileFastEditionComponent);
                component = fixture.componentInstance;
                component.profile = <noosfero.Profile>{ id: 1, name: "Test", identifier: "test" };
            });
        }));

        it("copy input profile when init", () => {
            fixture.detectChanges();
            expect(component.updatedProfile.name).toEqual('Test');
        });

        it("call profile service to update profile when save", () => {
            fixture.detectChanges();
            component.save();
            expect(profileService.update).toHaveBeenCalled();
        });
    });
});
