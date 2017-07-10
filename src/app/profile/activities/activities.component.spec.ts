import { NgPipesModule } from 'ngx-pipes';
import { By } from '@angular/platform-browser';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivitiesComponent } from './activities.component';
import * as helpers from "../../../spec/helpers";

describe("Components", () => {
    describe("Activities Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<ActivitiesComponent>;
        let component: ActivitiesComponent;

        beforeEach(async(() => {
            spyOn(mocks.profileService, "getNetworkActivities").and.returnValue(Promise.resolve({ data: {plain: () => { return [{ name: "activity1", verb: "create_article" }, { name: "activity2", verb: "create_article" }]; } } }));
            TestBed.configureTestingModule({
                imports: [RouterTestingModule, TranslateModule.forRoot(), NgPipesModule],
                declarations: [ActivitiesComponent],
                providers: [
                    { provide: ProfileService, useValue: mocks.profileService },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            });
            fixture = TestBed.createComponent(ActivitiesComponent);
            component = fixture.componentInstance;
        }));

        it("render a noosfero activity tag for each activity", () => {
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('noosfero-activity')).length).toEqual(2);
        });
    });
});
