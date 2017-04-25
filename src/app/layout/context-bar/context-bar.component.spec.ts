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
    let mocks = helpers.getMocks();

    let properties = {
        owner: {
            id: 1,
            identifier: 'profile-name',
            type: 'Person',
            layout_template: 'default',
            boxes: [{id: 6, blocks: [{id: 5, box: {id: 6}}]}]
        }
    };

    let blockService = jasmine.createSpyObj("BlockService", ["updateAll"]);
    let scope = jasmine.createSpyObj("$scope", ["$watch", "$apply"]);

    let eventFunction: Function;
    mocks.eventsHubService.subscribeToEvent = <any>((ev: string, fn: Function) => { eventFunction = fn; });

    let profileService = jasmine.createSpyObj("profileService", ["update"]);
    profileService.update = jasmine.createSpy("update").and.returnValue(helpers.mocks.promiseResultTemplate());
    let environmentService = jasmine.createSpyObj("environmentService", ["update"]);
    let state = jasmine.createSpyObj("$state", ["reload"]);

    beforeEach((done) => {
        spyOn(mocks.notificationService, 'success');
        let cls = createClass({
            template: htmlTemplate,
            directives: [ContextBarComponent],
            properties: properties,
            providers: [
                helpers.createProviderToValue("$state", state),
                helpers.createProviderToValue("$scope", scope),
                helpers.createProviderToValue("EventsHubService", mocks.eventsHubService),
                helpers.createProviderToValue("BlockService", blockService),
                helpers.createProviderToValue("NotificationService", mocks.notificationService),
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
        helper.component.apply();
        expect(profileService.update).not.toHaveBeenCalled();
    });

    it("call block service to apply blocks changes", () => {
        helper.component.blocksChanged = <noosfero.Block[]>[{ id: 1, box: {id: 6} }];
        helper.component.applyChanges();
        expect(profileService.update).toHaveBeenCalled();
    });

    it("return false when there is no blocks to be updated", () => {
        expect(helper.component.hasBlockChanges()).toBeFalsy();
    });

    it("return true when exists blocks to be updated", () => {
        helper.component.blocksChanged = <noosfero.Block[]>[{ id: 1, box: {id: 6} }];
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
        helper.component.applyChanges();
        expect(profileService.update).toHaveBeenCalledWith({ id: 1, layout_template: "leftbar" });
    });

    it("call environment service when owner is an environment", () => {
        environmentService.update = jasmine.createSpy("update").and.returnValue(helpers.mocks.promiseResultTemplate());
        helper.component.owner = <noosfero.Environment>{ id: 2, layout_template: 'default' };
        helper.component.owner.layout_template = "rightbar";
        helper.component.applyChanges();
        expect(environmentService.update).toHaveBeenCalledWith({ id: 2, layout_template: "rightbar" });
    });

    it("call state reload when discard changes", () => {
        helper.component.discard();
        expect(state.reload).toHaveBeenCalled();
    });

    it("call notification success when apply changes", () => {
        helper.component.blocksChanged = <any> [{id: 5, _destroy: true, box: {id: 6}}];
        helper.component.apply();
        helper.detectChanges();
        expect(helper.component['notificationService'].success).toHaveBeenCalled();
    });

    it("render template context-bar if block is marked for removal", () => {
        helper.component.blocksChanged = <any> [{id: 5, _destroy: true, box: {id: 6}}];
        helper.detectChanges();
        expect(helper.all('#context-bar .apply').length).toEqual(1);
    });

    it("call ProfileService.update if apply button is pressed", () => {
        helper.component.blocksChanged = <any> [{id: 5, _destroy: true, box: {id: 6}}];
        helper.component.applyChanges();
        expect(profileService.update).toHaveBeenCalledWith({ id: 1, boxes_attributes: [ { id: 6, blocks_attributes: [ { id: 5, _destroy: true } ] } ] });
    });

    it("call EnvironmentService.update if apply button is pressed", () => {
        helper.component.owner.type = "Environment";
        helper.component.blocksChanged = <any> [{id: 5, _destroy: true, box: {id: 6}}];
        helper.component.applyChanges();
        expect(environmentService.update).toHaveBeenCalledWith({ id: 1, boxes_attributes: [ { id: 6, blocks_attributes: [ { id: 5, _destroy: true } ] } ] });
    });


});
