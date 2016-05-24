import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, Input, provide, Component} from 'ng-forward';
import {provideFilters} from '../../../../spec/helpers';
import {DiscussionBlockComponent} from './discussion-block.component';
import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';
import * as helpers from "./../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-comment-paragraph-plugin-discussion-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-comment-paragraph-plugin-discussion-block>';

const tcb = new TestComponentBuilder();

describe("Components", () => {
    describe("Discussion Block Component", () => {

        let helper: ComponentTestHelper<DiscussionBlockComponent>;
        let settingsObj = {};
        let article = <noosfero.Article>{ name: "article1" };
        let mockedBlockService = {
            getApiContent: (content: any): any => {
                return Promise.resolve({ articles: [ article ], headers: (name: string) => { return name; } });
            }
        };
        let articleService: any = helpers.mocks.articleService;
        let profile = { name: 'profile-name' };

        let state = jasmine.createSpyObj("state", ["go"]);

        let providers = [
            new Provider('$state', { useValue: state }),
            new Provider('BlockService', {
                useValue: mockedBlockService
            }),
            new Provider('ArticleService', { useValue: articleService })
        ].concat(provideFilters("truncateFilter", "stripTagsFilter", "translateFilter", "amDateFormatFilter"));

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [DiscussionBlockComponent],
                providers: providers,
                properties: { block: {} }
            });
            helper = new ComponentTestHelper<DiscussionBlockComponent>(cls, done);
        });

        it("get discussions from the block service", () => {
            expect(helper.component.documents).toEqual([{ name: "article1" }]);
            expect(helper.component.block.hide).toEqual(false);
        });

        it("go to article page when open a document", () => {
            let block = helper.component;
            block.openDocument({ path: "path", profile: { identifier: "identifier" } });
            expect(state.go).toHaveBeenCalledWith("main.profile.page", { page: "path", profile: "identifier" });
        });
        
        it("verify removed article has been removed from list", () => {
            expect(helper.component.documents.length).toEqual(1);
            simulateRemovedEvent();
            expect(helper.component.documents.length).toEqual(0);
        });
        /**
         * Simulate the ArticleService ArticleEvent.removed event
         */
        function simulateRemovedEvent() {
            helper.component.articleService["notifyArticleRemovedListeners"](article);
        }        
    });
});
