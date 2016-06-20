import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, Input, provide, Component} from 'ng-forward';
import {provideFilters} from '../../../../spec/helpers';
import {TagsBlockComponent} from './tags-block.component';

const htmlTemplate: string = '<noosfero-tags-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-tags-block>';

const tcb = new TestComponentBuilder();

describe("Components", () => {
    describe("Tags Block Component", () => {

        let settingsObj = {};
        let mockedEnvironmentService = {
            getTags: (): any => {
                return Promise.resolve({ foo: 10, bar: 20 });
            }
        };
        let profile = { name: 'profile-name' };
        beforeEach(angular.mock.module("templates"));

        let state = jasmine.createSpyObj("state", ["go"]);


        function getProviders() {
            return [
                new Provider('$state', { useValue: state }),
                new Provider('EnvironmentService', {
                    useValue: mockedEnvironmentService
                }),
            ].concat(provideFilters("truncateFilter", "stripTagsFilter"));
        }
        let componentClass: any = null;

        function getComponent() {
            @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [TagsBlockComponent], providers: getProviders() })
            class BlockContainerComponent {
                block = { type: 'Block', settings: settingsObj };
                owner = profile;
                constructor() {
                }
            }
            return BlockContainerComponent;
        }


        it("get tags from the environment service", done => {
            tcb.createAsync(getComponent()).then(fixture => {
                let tagsBlock: TagsBlockComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(tagsBlock.tags).toEqual([{ text: "foo", weight: '10', link: '/tag/foo' }, { text: "bar", weight: '20', link: '/tag/bar' }]);
                done();
            });
        });
    });
});
