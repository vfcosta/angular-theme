import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, Input, provide, Component} from 'ng-forward';
import {provideFilters} from '../../../../spec/helpers';
import {RecentDocumentsBlockComponent} from './recent-documents-block.component';
import * as helpers from "./../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-recent-documents-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-recent-documents-block>';

const tcb = new TestComponentBuilder();

describe("Components", () => {
    describe("Recent Documents Block Component", () => {

        let settingsObj = {};
        let article = <noosfero.Article>{ name: "article1" };
        let mockedBlockService = {
            getApiContent: (block: noosfero.Block): any => {
                return Promise.resolve({ articles: [article], headers: (name: string) => { return name; } });
            }
        };
        let articleService: any = helpers.mocks.articleService;
        let profile = { name: 'profile-name' };
        beforeEach(angular.mock.module("templates"));

        let state = jasmine.createSpyObj("state", ["go"]);


        function getProviders() {
            return [
                new Provider('$state', { useValue: state }),
                new Provider('BlockService', {
                    useValue: mockedBlockService
                }),
                new Provider('ArticleService', { useValue: articleService })
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
                expect(recentDocumentsBlock.documents).toEqual([article]);
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

        it("verify removed article has been removed from list", done => {
            tcb.createAsync(getComponent()).then(fixture => {
                let recentDocumentsBlock: RecentDocumentsBlockComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(recentDocumentsBlock.documents.length).toEqual(1);
                simulateRemovedEvent(recentDocumentsBlock);
                expect(recentDocumentsBlock.documents.length).toEqual(0);
                done();
            });
        });

        /**
         * Simulate the ArticleService ArticleEvent.removed event
         */
        function simulateRemovedEvent(recentDocumentsBlock: RecentDocumentsBlockComponent) {
            recentDocumentsBlock.articleService["modelRemovedEventEmitter"].next(article);
        }

    });
});
