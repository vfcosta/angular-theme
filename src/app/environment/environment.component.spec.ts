import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './../login/auth.service';
import { NotificationService } from './../shared/services/notification.service';
import { EnvironmentService } from './../../lib/ng-noosfero-api/http/environment.service';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { ThemeService } from './../shared/services/theme.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DesignModeService } from './../shared/services/design-mode.service';
import { EnvironmentComponent } from './environment.component';
import * as helpers from '../../spec/helpers';

describe("Components", () => {
    describe("Environment Component", () => {
        let defaultEnvironment = <any>{ id: 1, name: 'Noosfero', boxes: [ Object({ id: 2 }) ] };
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<EnvironmentComponent>;
        let component: EnvironmentComponent;

        beforeEach(async(() => {
            spyOn(mocks.environmentService, 'getBoxes').and.returnValue(Promise.resolve({ data: [{ id: 2 }] }));
            spyOn(mocks.designModeService, 'setInDesignMode');
            mocks.route.snapshot.data = { environment: defaultEnvironment };
            TestBed.configureTestingModule({
                declarations: [EnvironmentComponent],
                providers: [
                    { provide: EnvironmentService, useValue: mocks.environmentService },
                    { provide: NotificationService, useValue: mocks.notificationService },
                    { provide: AuthService, useValue: mocks.authService },
                    { provide: DesignModeService, useValue: mocks.designModeService },
                    { provide: ThemeService, useValue: mocks.themeService },
                    { provide: ActivatedRoute, useValue: mocks.route },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [RouterTestingModule]
            });
            fixture = TestBed.createComponent(EnvironmentComponent);
            component = fixture.componentInstance;
        }));

        it("get the default environment", () => {
            fixture.detectChanges();
            expect(component['environment']).toEqual(<noosfero.Environment>{ id: 1, name: 'Noosfero', boxes: [ Object({ id: 2 }) ] });
        });

        it("reset design mode", () => {
            fixture.detectChanges();
            expect(mocks.designModeService.setInDesignMode).toHaveBeenCalledWith(false);
        });
    });
});
