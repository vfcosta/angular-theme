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

    let scope = jasmine.createSpyObj("$scope", ["$watch", "$apply"]);
    let mocks = helpers.getMocks();

    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [BoxesComponent],
            properties: properties,
            providers: [
                helpers.createProviderToValue("$scope", scope),
                helpers.createProviderToValue("DesignModeService", mocks.designModeService),
                helpers.createProviderToValue("EventsHubService", mocks.eventsHubService)
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
});
