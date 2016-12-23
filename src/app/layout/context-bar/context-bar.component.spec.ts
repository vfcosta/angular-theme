import { Component } from 'ng-forward';
import { ContextBarComponent } from './context-bar.component';
import * as helpers from "../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';

// this htmlTemplate will be re-used between the container components in this spec file
const htmlTemplate: string = '<context-bar [owner]="ctrl.owner"></context-bar>';

describe("Context Bar Component", () => {

    let helper: ComponentTestHelper<ContextBarComponent>;
    beforeEach(() => {
        angular.mock.module("templates");
    });

    let properties = {
        owner: {
            id: 1,
            identifier: 'profile-name',
            type: 'Person',
            layout_template: 'default'
        }
    };

    let eventsHubService = jasmine.createSpyObj("eventsHubService", ["subscribeToEvent", "emitEvent"]);
    let blockService = jasmine.createSpyObj("BlockService", ["updateAll"]);
    let scope = jasmine.createSpyObj("$scope", ["$watch", "$apply"]);
    blockService.updateAll = jasmine.createSpy("updateAll").and.returnValue(helpers.mocks.promiseResultTemplate());

    let eventFunction: Function;
    eventsHubService.subscribeToEvent = (ev: string, fn: Function) => { eventFunction = fn; };

    let profileService = jasmine.createSpyObj("profileService", ["update"]);
    let environmentService = jasmine.createSpyObj("environmentService", ["update"]);

    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [ContextBarComponent],
            properties: properties,
            providers: [
                helpers.createProviderToValue("$scope", scope),
                helpers.createProviderToValue("EventsHubService", eventsHubService),
                helpers.createProviderToValue("BlockService", blockService),
                helpers.createProviderToValue("NotificationService", helpers.mocks.notificationService),
                helpers.createProviderToValue("DesignModeService", helpers.mocks.designModeService),
                helpers.createProviderToValue('ProfileService', profileService),
                helpers.createProviderToValue('EnvironmentService', environmentService)
            ]
        });
        helper = new ComponentTestHelper<ContextBarComponent>(cls, done);
    });

    it("render template context-bar", () => {
        expect(helper.all('#context-bar').length).toEqual(1);
    });

    it("not call block service to apply blocks changes when no changes exists", () => {
        helper.component.blocksChanged = <noosfero.Block[]>[];
        helper.component.applyBlockChanges();
        expect(blockService.updateAll).not.toHaveBeenCalled();
    });

    it("call block service to apply blocks changes", () => {
        helper.component.blocksChanged = <noosfero.Block[]>[{ id: 1 }];
        helper.component.applyBlockChanges();
        expect(blockService.updateAll).toHaveBeenCalled();
    });

    it("return false when there is no blocks to be updated", () => {
        expect(helper.component.hasBlockChanges()).toBeFalsy();
    });

    it("return true when exists blocks to be updated", () => {
        helper.component.blocksChanged = <noosfero.Block[]>[{ id: 1 }];
        expect(helper.component.hasBlockChanges()).toBeTruthy();
    });

    it("add block to blocksChanged when receive an event", () => {
        let blockChanged = <noosfero.Block>{ id: 2, title: 'changed' };
        eventFunction(blockChanged);
        expect(helper.component.blocksChanged).toEqual([blockChanged]);
    });

    it("replace block to blocksChanged when receive an event", () => {
        let blockChanged = <noosfero.Block>{ id: 2, title: 'changed' };
        eventFunction(blockChanged);
        blockChanged = <noosfero.Block>{ id: 2, title: 'changed again' };
        eventFunction(blockChanged);
        expect(helper.component.blocksChanged).toEqual([blockChanged]);
    });

    it("not add block to blocksChanged when there is no changes in block", () => {
        let blockChanged = <noosfero.Block>{ id: 2 };
        eventFunction(blockChanged);
        expect(helper.component.blocksChanged).toEqual([]);
    });

    it("call profile service to update template when apply", () => {
        profileService.update = jasmine.createSpy("update").and.returnValue(helpers.mocks.promiseResultTemplate());
        helper.component.owner.layout_template = "leftbar";
        helper.component.applyLayoutTemplate();
        expect(profileService.update).toHaveBeenCalledWith({ id: 1, layout_template: "leftbar" });
    });

    it("call environment service when owner is an environment", () => {
        environmentService.update = jasmine.createSpy("update").and.returnValue(helpers.mocks.promiseResultTemplate());
        helper.component.owner = <noosfero.Environment>{ id: 2, layout_template: 'default' };
        helper.component.owner.layout_template = "rightbar";
        helper.component.applyLayoutTemplate();
        expect(environmentService.update).toHaveBeenCalledWith({ id: 2, layout_template: "rightbar" });
    });

    it("call profile service to update profile when save", () => {
        helper.component['profileService'].update = jasmine.createSpy("update").and.returnValue({
            then: (func: Function) => { func(); }
        });
        helper.component.applyCustomContentChanges();
        expect(helper.component['notificationService'].success).toHaveBeenCalled();
    });

});
