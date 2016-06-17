import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, Input, provide, Component} from 'ng-forward';
import {provideFilters} from '../../../../spec/helpers';
import {PersonTagsPluginInterestsBlockComponent} from './person-tags-plugin-interests-block.component';
import * as helpers from "./../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-person-tags-plugin-interests-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-person-tags-plugin-interests-block>';

const tcb = new TestComponentBuilder();

describe("Components", () => {
    describe("Person Tags Interests Block Component", () => {

        let settingsObj = {};
        let person = <noosfero.Person>{ name: "Person" };
        let mockedService = {
            getTags: (profile: noosfero.Profile): any => {
                return Promise.resolve({ data: ['foo', 'bar'], headers: (name: string) => { return name; } });
            }
        };
        beforeEach(angular.mock.module("templates"));

        let state = jasmine.createSpyObj("state", ["go"]);


        function getProviders() {
            return [
                new Provider('$state', { useValue: state }),
                new Provider('PersonService', {
                    useValue: mockedService
                })
            ].concat(provideFilters("truncateFilter", "stripTagsFilter"));
        }
        let componentClass: any = null;

        function getComponent() {
            @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [PersonTagsPluginInterestsBlockComponent], providers: getProviders() })
            class BlockContainerComponent {
                block = { type: 'Block', settings: settingsObj };
                owner = person;
                constructor() {
                }
            }
            return BlockContainerComponent;
        }

        it("get tags from the person service", done => {
            tcb.createAsync(getComponent()).then(fixture => {
                let PersonTagsPluginInterestsBlock: PersonTagsPluginInterestsBlockComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(PersonTagsPluginInterestsBlock.tags).toEqual(['foo', 'bar']);
                done();
            });
        });

    });
});
