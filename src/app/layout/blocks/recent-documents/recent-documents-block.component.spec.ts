import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, Input, provide, Component} from 'ng-forward';
import {provideFilters} from '../../../../spec/helpers';
import {RecentDocumentsBlockComponent} from './recent-documents-block.component';

const htmlTemplate: string = '<noosfero-recent-documents-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-recent-documents-block>';

const tcb = new TestComponentBuilder();

describe("Components", () => {
    describe("Recent Documents Block Component", () => {

        let settingsObj = {};
        let mockedBlockService = {
            getApiContent: (block: noosfero.Block): any => {
                return Promise.resolve({ articles: [{ name: "article1" }], headers: (name: string) => { return name; } });
            }
        };
        let profile = { name: 'profile-name' };
        beforeEach(angular.mock.module("templates"));

        let state = jasmine.createSpyObj("state", ["go"]);


        function getProviders() {
            return [
                new Provider('$state', { useValue: state }),
                new Provider('BlockService', {
                    useValue: mockedBlockService
                }),
            ].concat(provideFilters("truncateFilter", "stripTagsFilter"));
        }
        let componentClass: any = null;

        function getComponent() {
            @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [RecentDocumentsBlockComponent], providers: getProviders() })
            class BlockContainerComponent {
                block = { type: 'Block', settings: settingsObj };
                owner = profile;
                constructor() {
                }
            }
            return BlockContainerComponent;
        }


        it("get recent documents from the block service", done => {
            tcb.createAsync(getComponent()).then(fixture => {
                let recentDocumentsBlock: RecentDocumentsBlockComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(recentDocumentsBlock.documents).toEqual([{ name: "article1" }]);
                done();
            });
        });

        it("go to article page when open a document", done => {
            tcb.createAsync(getComponent()).then(fixture => {
                let recentDocumentsBlock: RecentDocumentsBlockComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                recentDocumentsBlock.openDocument({ path: "path", profile: { identifier: "identifier" } });
                expect(state.go).toHaveBeenCalledWith("main.profile.page", { page: "path", profile: "identifier" });
                done();
            });
        });

    });
});
