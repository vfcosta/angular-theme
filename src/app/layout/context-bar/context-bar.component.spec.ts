import { NotificationService } from './../../shared/services/notification.service';
import { TranslatorService } from './../../shared/services/translator.service';
import { EventsHubService } from './../../shared/services/events-hub.service';
import { DesignModeService } from './../../shared/services/design-mode.service';
import { BlockService } from './../../../lib/ng-noosfero-api/http/block.service';
import { EnvironmentService } from './../../../lib/ng-noosfero-api/http/environment.service';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { Component } from '@angular/core';
import { ContextBarComponent } from './context-bar.component';
import * as helpers from "../../../spec/helpers";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslatePipe } from '../../shared/pipes/translate-pipe';
import { By } from '@angular/platform-browser';

describe("Context Bar Component", () => {
    let mocks = helpers.getMocks();
    let fixture: ComponentFixture<ContextBarComponent>;
    let component: ContextBarComponent;
    let state = jasmine.createSpyObj("$state", ["reload"]);
    let eventFunction: Function;
    mocks.eventsHubService.subscribeToEvent = <any>((ev: string, fn: Function) => { eventFunction = fn; });

    beforeEach(async(() => {
        spyOn(mocks.profileService, 'update').and.returnValue(Promise.resolve(mocks.profile));
        spyOn(mocks.environmentService, 'update').and.callThrough();
        spyOn(mocks.notificationService, 'success').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [ContextBarComponent, TranslatePipe],
            providers: [
                { provide: "$state", useValue: state },
                { provide: "$scope", useValue: mocks.scopeWithEvents() },
                { provide: EventsHubService, useValue: mocks.eventsHubService },
                { provide: BlockService, useValue: mocks.blockService },
                { provide: NotificationService, useValue: mocks.notificationService },
                { provide: DesignModeService, useValue: mocks.designModeService },
                { provide: ProfileService, useValue: mocks.profileService },
                { provide: EnvironmentService, useValue: mocks.environmentService },
                { provide: TranslatorService, useValue: mocks.translatorService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(ContextBarComponent);
        component = fixture.componentInstance;
        component.originalLayout = 'default';
        component.blocksChanged = [];
        component.owner = 
            <noosfero.Profile>{
                id: 1,
                identifier: 'profile-name',
                type: 'Person',
                layout_template: 'default',
                boxes: [{ id: 6, blocks: [{ id: 5, box: { id: 6 } }] }]
            }
        fixture.detectChanges();
    }));

    it("render template context-bar", () => {
        expect(all('#context-bar').length).toEqual(1);
    });

    it("not call block service to apply blocks changes when no changes exists", () => {
        component.blocksChanged = <noosfero.Block[]>[];
        component.apply();
        expect(mocks.profileService.update).not.toHaveBeenCalled();
    });

    it("call block service to apply blocks changes", () => {
        component.blocksChanged = <noosfero.Block[]>[{ id: 1, box: { id: 6 } }];
        component.applyChanges();
        expect(mocks.profileService.update).toHaveBeenCalled();
    });

    it("return false when there is no blocks to be updated", () => {
        expect(component.hasBlockChanges()).toBeFalsy();
    });

    it("return true when exists blocks to be updated", () => {
        component.blocksChanged = <noosfero.Block[]>[{ id: 1, box: { id: 6 } }];
        expect(component.hasBlockChanges()).toBeTruthy();
    });

    it("add block to blocksChanged when receive an event", () => {
        let blockChanged = <noosfero.Block>{ id: 2, title: 'changed' };
        eventFunction(blockChanged);
        expect(component.blocksChanged).toEqual([blockChanged]);
    });

    it("replace block to blocksChanged when receive an event", () => {
        let blockChanged = <noosfero.Block>{ id: 2, title: 'changed' };
        eventFunction(blockChanged);
        blockChanged = <noosfero.Block>{ id: 2, title: 'changed again' };
        eventFunction(blockChanged);
        expect(component.blocksChanged).toEqual([blockChanged]);
    });

    it("not add block to blocksChanged when there is no changes in block", () => {
        let blockChanged = <noosfero.Block>{ id: 2 };
        eventFunction(blockChanged);
        expect(component.blocksChanged).toEqual([]);
    });

    it("call profile service to update template when apply", () => {
        component.owner.layout_template = "leftbar";
        component.applyChanges();
        expect(mocks.profileService.update).toHaveBeenCalledWith({ id: 1, layout_template: "leftbar" });
    });

    it("call environment service when owner is an environment", () => {
        component.owner = <noosfero.Environment>{ id: 2, layout_template: 'default' };
        component.owner.layout_template = "rightbar";
        component.applyChanges();
        expect(mocks.environmentService.update).toHaveBeenCalledWith({ id: 2, layout_template: "rightbar" });
    });

    it("call state reload when discard changes", () => {
        component.discard();
        expect(state.reload).toHaveBeenCalled();
    });

    it("call notification success when apply changes", fakeAsync(() => {
        component.blocksChanged = <any>[{ id: 5, _destroy: true, box: { id: 6 } }];
        component.apply();
        fixture.detectChanges();
        tick();
        expect(component['notificationService'].success).toHaveBeenCalledWith({ title: "contextbar.edition.apply.success.title", message: "contextbar.edition.apply.success.message" });
    }));

    it("disable edit mode when changes were applied successfully", fakeAsync(() => {
        component.blocksChanged = <any>[{ id: 5, _destroy: true, box: { id: 6 } }];
        component.apply();
        TestBed.get(DesignModeService).setInDesignMode(true);
        tick();
        expect(TestBed.get(DesignModeService).isInDesignMode()).toBeFalsy();
    }));

    it("render template context-bar if block is marked for removal", () => {
        component.blocksChanged = <any>[{ id: 5, _destroy: true, box: { id: 6 } }];
        fixture.detectChanges();
        expect(all('#context-bar .apply').length).toEqual(1);
    });

    it("call ProfileService.update if apply button is pressed", () => {
        component.blocksChanged = <any>[{ id: 5, _destroy: true, box: { id: 6 } }];
        component.applyChanges();
        expect(mocks.profileService.update).toHaveBeenCalledWith({ id: 1, boxes_attributes: [{ id: 6, blocks_attributes: [{ id: 5, _destroy: true }] }] });
    });

    it("call mocks.EnvironmentService.update if apply button is pressed", () => {
        component.owner.type = "Environment";
        component.blocksChanged = <any>[{ id: 5, _destroy: true, box: { id: 6 } }];
        component.applyChanges();
        expect(mocks.environmentService.update).toHaveBeenCalledWith({ id: 1, boxes_attributes: [{ id: 6, blocks_attributes: [{ id: 5, _destroy: true }] }] });
    });

    function all(selector: string) {
        let compiled = fixture.debugElement;
        return compiled.queryAll(By.css(selector));
    }

});
