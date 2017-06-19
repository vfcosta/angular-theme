import { TestComponentBuilder } from 'ng-forward/cjs/testing/test-component-builder';
import { provideFilters } from '../../../spec/helpers';
import { ActivitiesComponent } from './activities.component';
import * as helpers from "../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';
import {Provider} from 'ng-forward';

const htmlTemplate: string = '<noosfero-activities [activities]="ctrl.activities"></noosfero-activities>';

describe("Components", () => {

    describe("Activities Component", () => {

        let helper: ComponentTestHelper<ActivitiesComponent>;

        beforeEach(() => {
            angular.mock.module("templates");
        });

        let profileService = {
            getCurrentProfile: (filters: any): any => {
                return Promise.resolve({ id: 1, identifier: "person1" });
            },
            getNetworkActivities: (id: number): any => {
                if (id === 1) {
                    return Promise.resolve({ data: {plain: () => { return [{ name: "activity1", verb: "create_article" }, { name: "activity2", verb: "create_article" }]; } } });
                } else {
                    return Promise.resolve({ data: {plain: () => { return []; }}});
                }
            }
        };

        let environmentService = jasmine.createSpyObj("EnvironmentService", ["getCurrentEnvironment"]);
        environmentService.getCurrentEnvironment = jasmine.createSpy("getCurrentEnvironment").and.returnValue(helpers.mocks.promiseResultTemplate({ id: 1, name: 'Noosfero' }));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [ActivitiesComponent],
                properties: {
                    activities: [
                        { name: "activity1", verb: "create_article" },
                        { name: "activity2", verb: "create_article" }
                    ],
                    profile: { identifier: 'someone' }
                },
                providers:
                [
                    helpers.createProviderToValue('EnvironmentService', environmentService),
                    helpers.createProviderToValue('profileService', profileService)
                ].concat(provideFilters("truncateFilter", "stripTagsFilter", "translateFilter"))
            });
            helper = new ComponentTestHelper<ActivitiesComponent>(cls, done);
        });

        it("render a noosfero activity tag for each activity", () => {
            helper.detectChanges();
            expect(helper.all("noosfero-activity").length).toEqual(2);
        });

    });

});
