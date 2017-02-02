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

        let profileServiceMock = {
            getCurrentProfile: (filters: any): any => {
                return Promise.resolve({ id: 1, identifier: "person1" });
            },
            getActivities: (id: number): any => {
                if (id === 1) {
                    return Promise.resolve(
                        {
                            data: {
                                activities:
                                [
                                    { name: "activity1", verb: "create_article" },
                                    { name: "activity2", verb: "create_article" }
                                ]
                            }

                        }
                    )
                }
            }
        };
        let serviceProvider = new Provider('ProfileService', { useValue: profileServiceMock });
        let environmentService = jasmine.createSpyObj("environmentService", ["getCurrentEnvironment"]);

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
                    serviceProvider
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
