import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileConfigurationComponent } from './profile-configuration.component';
import * as helpers from '../../../spec/helpers';

describe("Components", () => {
    describe("Profile Configuration Component", () => {
        const mocks = helpers.getMocks();
        let fixture: ComponentFixture<ProfileConfigurationComponent>;
        let component: ProfileConfigurationComponent;

        beforeEach(async(() => {
            mocks.route.snapshot.data["profile"] = { id: 1};
            mocks.route.snapshot.params["profile"] = "identifier";
            TestBed.configureTestingModule({
                imports: [RouterTestingModule, TranslateModule.forRoot()],
                declarations: [ProfileConfigurationComponent],
                providers: [
                    { provide: ProfileService, useValue: mocks.profileService },
                    { provide: ActivatedRoute, useValue: mocks.route },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            });
            fixture = TestBed.createComponent(ProfileConfigurationComponent);
            component = fixture.componentInstance;
        }));

        it("set profile", () => {
            expect(component.profileIdentifier).toEqual("identifier");
            expect(component.profile).toEqual(<noosfero.Profile>{ id: 1 });
        });
    });
});
