import { Provider, provide, Component } from 'ng-forward';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';
import { ApproveArticleTaskAcceptComponent } from './approve-article-task-accept.component';

const htmlTemplate: string = '<approve-article-task-accept [task]="ctrl.task" [confirmation-task]="ctrl.confirmationTask"></approve-article-task-accept>';

describe("Components", () => {
    describe("Approve Article Task Accept Component", () => {

        let helper: ComponentTestHelper<ApproveArticleTaskAcceptComponent>;
        let articleService = jasmine.createSpyObj("articleService", ["getByProfile"]);
        let articles = [{ id: 1, title: "folder1" }, { id: 2, title: "folder2" }];
        let task = <any>{ target: { id: 5, identifier: "profile" }, data: {} };
        articleService.getByProfile = jasmine.createSpy("getByProfile").and.returnValue(Promise.resolve({ headers: () => { }, data: articles }));

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [ApproveArticleTaskAcceptComponent],
                providers: [
                    helpers.createProviderToValue("ArticleService", articleService)
                ].concat(helpers.provideFilters("translateFilter")),
                properties: { task: task, confirmationTask: task }
            });
            helper = new ComponentTestHelper<ApproveArticleTaskAcceptComponent>(cls, done);
        });

        it("set folder array with folders as options", () => {
            expect(articleService.getByProfile).toHaveBeenCalled();
            expect(helper.component.folders.map((f) => { return f.id; })).toEqual([null, 1, 2]);
            expect(helper.component.folders.map((f) => { return f.path; })).toEqual(["profile", "profile/folder1", "profile/folder2"]);
        });
    });
});
