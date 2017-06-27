import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { NoosferoUrlPipe } from './../../../../app/shared/pipes/noosfero-url.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import {EventPluginEventBlockComponent} from './event-plugin-event-block.component';
import * as helpers from "./../../../../spec/helpers";

const events = [
    {
        title: 'Test',
        id: 1,
        view_url: { host: 'localhost', page: ['event'] },
        date: Math.floor(Date.now() / 1000)
    }
];

describe("Components", () => {
    describe("Events Block Component", () => {

        let mocks = helpers.getMocks();
        let person = <noosfero.Person>{ name: "Person" };
        let fixture: ComponentFixture<EventPluginEventBlockComponent>;
        let component: EventPluginEventBlockComponent;

        beforeEach(async(() => {
            spyOn(mocks.blockService, "getApiContent").and.returnValue(
                Promise.resolve({ events: events, headers: (name: string) => { return name; } })
            );
            TestBed.configureTestingModule({
                declarations: [EventPluginEventBlockComponent, NoosferoUrlPipe],
                providers: [
                    { provide: BlockService, useValue: mocks.blockService },
                    { provide: "$state", useValue: mocks.stateService },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            });
            fixture = TestBed.createComponent(EventPluginEventBlockComponent);
            component = fixture.componentInstance;
            component.block = <any>{ type: 'Block', settings: {} };
            component.owner = person;
        }));

        it("get events from the block service", (fakeAsync(() => {
            fixture.detectChanges();
            expect(TestBed.get(BlockService).getApiContent).toHaveBeenCalled();
            tick();
            expect(component.events).toEqual(events);
        })));
    });
});
