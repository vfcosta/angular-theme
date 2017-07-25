import { NgPipesModule } from 'ngx-pipes';
import { BoxComponent } from './box.component';
import { By } from '@angular/platform-browser';
import { EventsHubService } from './../../shared/services/events-hub.service';
import { DesignModeService } from './../../shared/services/design-mode.service';
import { BoxesComponent } from './boxes.component';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from '../../../spec/helpers';

describe("Boxes Component", () => {
    let fixture: ComponentFixture<BoxesComponent>;
    let component: BoxesComponent;
    let mocks = helpers.getMocks();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoxesComponent, BoxComponent],
            providers: [
                { provide: DesignModeService, useValue: mocks.designModeService },
                { provide: EventsHubService, useValue: mocks.eventsHubService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [NgPipesModule],
        });
        fixture = TestBed.createComponent(BoxesComponent);
        component = fixture.componentInstance;
        component.boxes = <noosfero.Box[]>[ { id: 1, position: 1, blocks: [] }, { id: 2, position: 2, blocks: [] }, { id: 3, position: 3, blocks: [] } ];
        component.owner = <noosfero.Profile>{ id: 1, identifier: 'profile-name', type: 'Person' };
        component.layout = "default";
    }));

    it("renders boxes into a container", () => {
        component.setupColumns();
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('div.col-md-6')).length).toEqual(1);
        expect(fixture.debugElement.queryAll(By.css('div.col-md-3')).length).toEqual(2);
    });

    it("render subcolumns into a box container", () => {
        component.layout = "lefttopright";
        component.setupColumns();
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(".col-md-9 .col-md-12")).length).toEqual(1);
        expect(fixture.debugElement.queryAll(By.css(".col-md-9 .col-md-9")).length).toEqual(1);
        expect(fixture.debugElement.queryAll(By.css(".col-md-9 .col-md-3")).length).toEqual(1);
    });
});
