import { NgPipesModule } from 'ngx-pipes';
import { By } from '@angular/platform-browser';
import { EventsHubService } from './../../shared/services/events-hub.service';
import { DesignModeService } from './../../shared/services/design-mode.service';
import { BoxComponent } from './box.component';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from '../../../spec/helpers';

describe("Box Component", () => {
    let fixture: ComponentFixture<BoxComponent>;
    let component: BoxComponent;
    const mocks = helpers.getMocks();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoxComponent],
            providers: [
                { provide: DesignModeService, useValue: mocks.designModeService },
                { provide: EventsHubService, useValue: mocks.eventsHubService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [NgPipesModule]
        });
        fixture = TestBed.createComponent(BoxComponent);
        component = fixture.componentInstance;
        component.boxes = <noosfero.Box[]>[ { id: 1, position: 1 }, { id: 2, position: 2 } ];
        component.owner = <noosfero.Profile>{ id: 1, identifier: 'profile-name', type: 'Person' };
    }));

    it("insert block into blocks list when receive event", () => {
        component.box = <noosfero.Box>{ id: 1, blocks: []};
        component.addBlock(<noosfero.Block>{});
        expect(component.box.blocks.length).toEqual(1);
    });
});
