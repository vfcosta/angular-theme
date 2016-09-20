import {DiscussionPeriodComponent} from './discussion-period.component';
import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';

const htmlTemplate: string = '<discussion-period [article]="ctrl.article"></discussion-period>';

describe("Components", () => {
    describe("Discussion Period Component", () => {

        let helper: ComponentTestHelper<DiscussionPeriodComponent>;
        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let properties = { article: {} };
            let cls = createClass({
                template: htmlTemplate,
                directives: [DiscussionPeriodComponent],
                properties: properties
            });
            helper = new ComponentTestHelper<DiscussionPeriodComponent>(cls, done);
        });

        it("return false in isDiscussion when no type was specified", () => {
            expect(helper.component.isDiscussion()).toBeFalsy();
        });

        it("return false in isDiscussion when other type was specified", () => {
            helper.changeProperties({ article: { type: "TextArticle" } });
            expect(helper.component.isDiscussion()).toBeFalsy();
        });

        it("return true in isDiscussion when discussion type was specified", () => {
            helper.changeProperties({ article: { type: "CommentParagraphPlugin::Discussion" } });
            expect(helper.component.isDiscussion()).toBeTruthy();
        });

        it("return true in notOpened when start date is after today", () => {
            let date = new Date();
            date.setDate(date.getDate() + 1);
            helper.changeProperties({ article: { start_date: date.toISOString() } });
            expect(helper.component.notOpened()).toBeTruthy();
            expect(helper.component.available()).toBeFalsy();
            expect(helper.component.closed()).toBeFalsy();
        });

        it("return false in notOpened when start date is before today", () => {
            let date = new Date();
            date.setDate(date.getDate() - 1);
            helper.changeProperties({ article: { start_date: date.toISOString() } });
            expect(helper.component.notOpened()).toBeFalsy();
        });

        it("return false in notOpened when start date is null", () => {
            helper.changeProperties({ article: { start_date: null } });
            expect(helper.component.notOpened()).toBeFalsy();
        });

        it("return true in closed when end date is before today", () => {
            let date = new Date();
            date.setDate(date.getDate() - 1);
            helper.changeProperties({ article: { end_date: date.toISOString() } });
            expect(helper.component.closed()).toBeTruthy();
            expect(helper.component.available()).toBeFalsy();
            expect(helper.component.notOpened()).toBeFalsy();
        });

        it("return false in closed when start date is after today", () => {
            let date = new Date();
            date.setDate(date.getDate() + 1);
            helper.changeProperties({ article: { end_date: date.toISOString() } });
            expect(helper.component.closed()).toBeFalsy();
        });

        it("return false in closed when end date is null", () => {
            helper.changeProperties({ article: { start_date: null } });
            expect(helper.component.closed()).toBeFalsy();
        });

        it("return true in available when start date is before today and end date is after", () => {
            let date = new Date();
            date.setDate(date.getDate() - 1);
            let startDate = date.toISOString();
            date.setDate(date.getDate() + 3);
            let endDate = date.toISOString();
            helper.changeProperties({ article: { start_date: startDate, end_date: endDate } });
            expect(helper.component.available()).toBeTruthy();
            expect(helper.component.closed()).toBeFalsy();
            expect(helper.component.notOpened()).toBeFalsy();
        });

        it("return true in available when start date is before today and end date is null", () => {
            let date = new Date();
            date.setDate(date.getDate() - 1);
            let startDate = date.toISOString();
            helper.changeProperties({ article: { start_date: startDate, end_date: null } });
            expect(helper.component.available()).toBeTruthy();
            expect(helper.component.closed()).toBeFalsy();
            expect(helper.component.notOpened()).toBeFalsy();
        });

        it("return true in available when start date is null and end date is after today", () => {
            let date = new Date();
            date.setDate(date.getDate() + 3);
            let endDate = date.toISOString();
            helper.changeProperties({ article: { start_date: null, end_date: endDate } });
            expect(helper.component.available()).toBeTruthy();
            expect(helper.component.closed()).toBeFalsy();
            expect(helper.component.notOpened()).toBeFalsy();
        });
    });
});
