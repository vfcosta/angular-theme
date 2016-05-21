import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, Input, provide, Component} from 'ng-forward';
import {provideFilters} from '../../../../spec/helpers';
import {DiscussionBlockComponent} from './discussion-block.component';
import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';

const htmlTemplate: string = '<noosfero-comment-paragraph-plugin-discussion-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-comment-paragraph-plugin-discussion-block>';

const tcb = new TestComponentBuilder();

describe("Components", () => {
    describe("Discussion Block Component", () => {

        let helper: ComponentTestHelper<DiscussionBlockComponent>;
        let settingsObj = {};
        let mockedBlockService = {
            getApiContent: (content: any): any => {
                return Promise.resolve({ articles: [{ name: "article1" }], headers: (name: string) => { return name; } });
            }
        };
        let profile = { name: 'profile-name' };

        let state = jasmine.createSpyObj("state", ["go"]);

        let providers = [
            new Provider('$state', { useValue: state }),
            new Provider('BlockService', {
                useValue: mockedBlockService
            }),
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
    });
});
