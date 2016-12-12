import { Component } from 'ng-forward';
import { BoxesComponent } from './boxes.component';
import * as helpers from "../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';

// this htmlTemplate will be re-used between the container components in this spec file
const htmlTemplate: string = '<noosfero-boxes [boxes]="ctrl.boxes" [owner]="ctrl.profile" [layout]="ctrl.layout"></noosfero-boxes>';


describe("Boxes Component", () => {

    let helper: ComponentTestHelper<BoxesComponent>;
    beforeEach(() => {
        angular.mock.module("templates");
    });

    let properties = {
        boxes: [
            { id: 1, position: 1 },
            { id: 2, position: 2 }
        ],
        owner: {
            id: 1,
            identifier: 'profile-name',
            type: 'Person'
        },
        layout: 'default'
    };

    let eventsHubService = jasmine.createSpyObj("eventsHubService", ["subscribeToEvent", "emitEvent"]);
    let blockService = jasmine.createSpyObj("BlockService", ["updateAll"]);
    let scope = jasmine.createSpyObj("$scope", ["$watch", "$apply"]);
    blockService.updateAll = jasmine.createSpy("updateAll").and.returnValue(helpers.mocks.promiseResultTemplate());

    let eventFunction: Function;
    eventsHubService.subscribeToEvent = (ev: string, fn: Function) => { eventFunction = fn; };

    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [BoxesComponent],
            properties: properties,
            providers: [
                helpers.createProviderToValue("$scope", scope),
                helpers.createProviderToValue("EventsHubService", eventsHubService),
                helpers.createProviderToValue("BlockService", blockService),
                helpers.createProviderToValue("NotificationService", helpers.mocks.notificationService),
                helpers.createProviderToValue("DesignModeService", helpers.mocks.designModeService)
            ]
        });
        helper = new ComponentTestHelper<BoxesComponent>(cls, done);
    });

    it("renders boxes into a container", () => {
        expect(helper.all('div.col-md-6').length).toEqual(1);
        expect(helper.all('div.col-md-3').length).toEqual(2);
    });

    it("render subcolumns into a box container", () => {
        helper.component.layout = "lefttopright";
        helper.component.columns = null;
        helper.component.ngOnInit();
        helper.detectChanges();
        expect(helper.all('.col-md-9 .col-md-12').length).toEqual(1);
        expect(helper.all('.col-md-9 .col-md-9').length).toEqual(1);
        expect(helper.all('.col-md-9 .col-md-3').length).toEqual(1);
    });

    it("call block service to apply blocks changes", () => {
        helper.component.applyBlockChanges();
        expect(blockService.updateAll).toHaveBeenCalled();
    });

    it("return false when there is no blocks to be updated", () => {
        expect(helper.component.displayApplyBlockChanges()).toBeFalsy();
    });

    it("return true when exists blocks to be updated", () => {
        helper.component.blocksChanged = <noosfero.Block[]>[{ id: 1 }];
        expect(helper.component.displayApplyBlockChanges()).toBeTruthy();
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
});
