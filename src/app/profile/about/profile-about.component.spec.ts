import { NgPipesModule } from 'ngx-pipes';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from './../../../spec/helpers';
import {ProfileAboutComponent} from './profile-about.component';

describe('Profile about component', () => {
    let profile = {
        id: 1,
        identifier: "profile-test",
        type: 'Person',
        additional_data: { 'Address': 'Street A, Number 102' }
    };
    let mocks = helpers.getMocks();
    let fixture: ComponentFixture<ProfileAboutComponent>;
    let component: ProfileAboutComponent;

    beforeEach(async(() => {
        spyOn(mocks.profileService, "getCurrentProfile").and.returnValue(Promise.resolve(profile));
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, TranslateModule.forRoot(), NgPipesModule],
            declarations: [ProfileAboutComponent],
            providers: [
                { provide: ProfileService, useValue: mocks.profileService },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(ProfileAboutComponent);
        component = fixture.componentInstance;
    }));

    it("renders profile-about directive", fakeAsync(() => {
        tick();
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('div.profile-about')).length).toEqual(1);
    }));

    it('renders profile-about directive with custom fields', fakeAsync(() => {
        tick();
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('div.profile-custom-fields')).length).toEqual(1);
    }));
});
