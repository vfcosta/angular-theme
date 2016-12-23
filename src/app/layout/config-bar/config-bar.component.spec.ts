import { Component } from 'ng-forward';
import { ConfigBarComponent } from './config-bar.component';
import * as helpers from "../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';

// this htmlTemplate will be re-used between the container components in this spec file
const htmlTemplate: string = '<config-bar [owner]="ctrl.owner"></config-bar>';

describe("ConfigBar Component", () => {

    let helper: ComponentTestHelper<ConfigBarComponent>;
    beforeEach(() => {
        angular.mock.module("templates");
    });

    let properties = {
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

    let profileService = jasmine.createSpyObj("profileService", ["update"]);
    let environmentService = jasmine.createSpyObj("environmentService", ["update"]);

    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [ConfigBarComponent],
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
        helper = new ComponentTestHelper<ConfigBarComponent>(cls, done);
    });

});
