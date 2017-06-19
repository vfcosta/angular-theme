import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { TranslatePipe } from './../../../../app/shared/pipes/translate-pipe';
import {RecentActivitiesPluginActivitiesBlockComponent} from './recent-activities-plugin-activities-block.component';
import * as helpers from "./../../../../spec/helpers";
import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Recent Activities Block Component", () => {

        let settingsObj = {};
        let person = <noosfero.Person>{ name: "Person" };
        let fixture: ComponentFixture<RecentActivitiesPluginActivitiesBlockComponent>;
        let component: RecentActivitiesPluginActivitiesBlockComponent;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            spyOn(mocks.blockService, 'getApiContent').and.returnValue(
                Promise.resolve({ activities: [{ verb: 'new_friendship' }], headers: (name: string) => { return name; } })
            );

            TestBed.configureTestingModule({
                declarations: [RecentActivitiesPluginActivitiesBlockComponent, TranslatePipe],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: BlockService, useValue: mocks.blockService },
                    { provide: "translatorService", useValue: mocks.translatorService }
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(RecentActivitiesPluginActivitiesBlockComponent);
                component = fixture.componentInstance;
                component.block = { type: 'Block', settings: settingsObj };
            });
        }));

        it("get activities from block service", fakeAsync(() => {
            fixture.detectChanges();
            tick();
            expect(component.activities[0]['verb']).toEqual('new_friendship');
        }));

    });
});
