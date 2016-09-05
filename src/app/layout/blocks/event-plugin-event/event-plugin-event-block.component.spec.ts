import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, Input, provide, Component} from 'ng-forward';
import {provideFilters} from '../../../../spec/helpers';
import {EventPluginEventBlockComponent} from './event-plugin-event-block.component';
import * as helpers from "./../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-event-plugin-event-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-event-plugin-event-block>';

const tcb = new TestComponentBuilder();

const events = [
    {
        title: 'Test',
        id: 1,
        view_url: { host: 'localhost', page: ['event'] },
        date: Math.floor(Date.now() / 1000)
    }
];

describe("Components", () => {
    describe("Events Block Component", () => {

        let settingsObj = {};
        let person = <noosfero.Person>{ name: "Person" };
        let mockedService = {
            getApiContent: (block: noosfero.Block): any => {
                return Promise.resolve({ events: events, headers: (name: string) => { return name; } });
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
            @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [EventPluginEventBlockComponent], providers: getProviders() })
            class BlockContainerComponent {
                block = { type: 'Block', settings: settingsObj };
                owner = person;
                constructor() {
                }
            }
            return BlockContainerComponent;
        }

        it("get events from the block service", done => {
            tcb.createAsync(getComponent()).then(fixture => {
                let EventPluginEventBlock: EventPluginEventBlockComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(EventPluginEventBlock.events).toEqual(events);
                done();
            });
        });

    });
});
