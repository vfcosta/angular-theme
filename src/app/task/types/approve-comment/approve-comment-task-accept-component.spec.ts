import { Provider, provide, Component } from 'ng-forward';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';
import { ApproveCommentTaskAcceptComponent } from './approve-comment-task-accept.component';

const htmlTemplate: string = '<approve-comment-task-accept [task]="ctrl.task" [confirmation-task]="ctrl.confirmationTask"></approve-comment-task-accept>';

describe("Components", () => {
    describe("Approve Comment Task Accept Component", () => {

        let helper: ComponentTestHelper<ApproveCommentTaskAcceptComponent>;
        let articleService = jasmine.createSpyObj("articleService", ["get"]);
        let article = { id: 1 };
        let task = <any>{ target: { id: 5 }, data: { comment_attributes: "{\"body\":\"comment body\",\"source_id\":4}" } };
        articleService.get = jasmine.createSpy("get").and.returnValue(Promise.resolve({ headers: () => { }, data: article }));

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [ApproveCommentTaskAcceptComponent],
                providers: [
                    helpers.createProviderToValue("ArticleService", articleService)
                ].concat(helpers.provideFilters("translateFilter")),
                properties: { task: task, confirmationTask: task }
            });
            helper = new ComponentTestHelper<ApproveCommentTaskAcceptComponent>(cls, done);
        });

        it("display comment for approval", () => {
            expect(helper.component.comment.body).toEqual("comment body");
            expect(helper.all('noosfero-comment').length).toEqual(1);
        });

        it("call article service to load article", () => {
            expect(articleService.get).toHaveBeenCalledWith(4);
        });
    });
});
