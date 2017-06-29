import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import * as helpers from "../../../../../spec/helpers";
import { ActivityHeaderComponent } from "./activity-header.component";
import { TranslateModule } from '@ngx-translate/core';

describe("Components", () => {
    describe("Noosfero Activity Header", () => {
        let activity = <any>{ name: "activity1", verb: "create_article", params: {} };
        let environmentService = {
            getCurrentEnvironment: (filters: any): any => {
                return Promise.resolve({ id: 1, name: 'Nosofero' });
            }
        };
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<ActivityHeaderComponent>;
        let component: ActivityHeaderComponent;

        beforeEach(async(() => {
            spyOn(mocks.environmentService, "getCurrentEnvironment").and.returnValue(Promise.resolve({}));
            TestBed.configureTestingModule({
                declarations: [ActivityHeaderComponent],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(ActivityHeaderComponent);
            component = fixture.componentInstance;
            component.profiles = 1;
            component.desc = "desc.single";
            component.activity = <noosfero.Activity>{ user: { id: 1} };
        }));

        it("get plural description", () => {
            component.profiles = 2;
            fixture.detectChanges();
            expect(component.getDesc()).toContain("plural");
        });

        it("get singular description", () => {
            component.profiles = null;
            fixture.detectChanges();
            expect(component.getDesc()).not.toContain("plural");
        });      

        it("verify if profiles count greater then zero", () => {
            component.profiles = null;
            fixture.detectChanges();
            expect(component.count()).toBeGreaterThan(0);
        });                  
    });
});
