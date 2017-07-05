import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from './../shared/services/notification.service';
import { ProfileService } from './../../lib/ng-noosfero-api/http/profile.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ThemeService } from './../shared/services/theme.service';
import { DesignModeService } from './../shared/services/design-mode.service';
import { ProfileComponent } from "./profile.component";
import * as helpers from "../../spec/helpers";

describe("Components", () => {
    describe("Profile Component", () => {
        let mocks = helpers.getMocks();

        let fixture: ComponentFixture<ProfileComponent>;
        let component: ProfileComponent;

        beforeEach(async(() => {
            mocks.route.snapshot.data = { profile: { id: 1, boxes: [{ id: 2 }] }};
            spyOn(mocks.designModeService, "setInDesignMode");
            TestBed.configureTestingModule({
                imports: [RouterTestingModule, TranslateModule.forRoot()],
                declarations: [ProfileComponent],
                providers: [
                    { provide: ProfileService, useValue: mocks.profileService },
                    { provide: NotificationService, useValue: mocks.notificationService },
                    { provide: DesignModeService, useValue: mocks.designModeService },
                    { provide: ThemeService, useValue: mocks.themeService },
                    { provide: Router, useValue: mocks.router },
                    { provide: ActivatedRoute, useValue: mocks.route },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            });
            fixture = TestBed.createComponent(ProfileComponent);
            component = fixture.componentInstance;
            component.profile = <noosfero.Profile>mocks.profile;
            fixture.detectChanges();
        }));

        it("reset design mode", () => {
            expect(mocks.designModeService.setInDesignMode).toHaveBeenCalledWith(false);
        });
    });
});
