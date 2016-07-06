import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, Input, provide, Component} from 'ng-forward';
import {provideFilters} from '../../../../spec/helpers';
import {RecentActivitiesPluginActivitiesBlockComponent} from './recent-activities-plugin-activities-block.component';
import * as helpers from "./../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-recent-activities-plugin-activities-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-recent-activities-plugin-activities-block>';

const tcb = new TestComponentBuilder();

describe("Components", () => {
    describe("Recent Activities Block Component", () => {

        let settingsObj = {};
        let person = <noosfero.Person>{ name: "Person" };
        let mockedService = {
            getApiContent: (block: noosfero.Block): any => {
                return Promise.resolve({ activities: [{ verb: 'new_friendship' }], headers: (name: string) => { return name; } });
            }
        };
        beforeEach(angular.mock.module("templates"));

        let state = jasmine.createSpyObj("state", ["go"]);


        function getProviders() {
            return [
                new Provider('$state', { useValue: state }),
                new Provider('BlockService', {
                    useValue: mockedService
                })
            ].concat(provideFilters("truncateFilter", "stripTagsFilter"));
        }
        let componentClass: any = null;

        function getComponent() {
            @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [RecentActivitiesPluginActivitiesBlockComponent], providers: getProviders() })
            class BlockContainerComponent {
                block = { type: 'Block', settings: settingsObj };
                owner = person;
                constructor() {
                }
            }
            return BlockContainerComponent;
        }

        it("get activities from block service", done => {
            tcb.createAsync(getComponent()).then(fixture => {
                let RecentActivitiesPluginActivitiesBlock: RecentActivitiesPluginActivitiesBlockComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(RecentActivitiesPluginActivitiesBlock.activities[0]['verb']).toEqual('new_friendship');
                done();
            });
        });

    });
});
