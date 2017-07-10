import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../../app/shared/services/translator.service';
import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import {RecentActivitiesPluginActivitiesBlockComponent} from './recent-activities-plugin-activities-block.component';
import * as helpers from './../../../../spec/helpers';
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
                declarations: [RecentActivitiesPluginActivitiesBlockComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: BlockService, useValue: mocks.blockService },
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ],
                imports: [TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(RecentActivitiesPluginActivitiesBlockComponent);
            component = fixture.componentInstance;
            component.block = { type: 'Block', settings: settingsObj };
        }));

        it("get activities from block service", fakeAsync(() => {
            fixture.detectChanges();
            tick();
            expect(component.activities[0]['verb']).toEqual('new_friendship');
        }));

    });
});
