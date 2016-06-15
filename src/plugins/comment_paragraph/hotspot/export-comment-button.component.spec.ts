import {ExportCommentButtonHotspotComponent} from "./export-comment-button.component";
import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';
import * as helpers from "../../../spec/helpers";
import {Provider} from 'ng-forward';
import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {PermissionDirective} from '../../../app/shared/components/permission/permission.directive';

let htmlTemplate = '<export-comment-button-hotspot [article]="ctrl.article"></export-comment-button-hotspot>';

describe("Components", () => {
    describe("Export Comment Button Hotspot Component", () => {

        let serviceMock = jasmine.createSpyObj("CommentParagraphService", ["getArticle"]);

        let providers = [new Provider('CommentParagraphService', { useValue: serviceMock })]
            .concat(helpers.provideFilters('translateFilter'));
        let helper: ComponentTestHelper<ExportCommentButtonHotspotComponent>;

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [ExportCommentButtonHotspotComponent, PermissionDirective],
                providers: providers,
                properties: {
                    article: {}
                }
            });
            helper = new ComponentTestHelper<ExportCommentButtonHotspotComponent>(cls, done);
        });

        it('return true when comment paragraph is active', () => {
            helper.component.article = <noosfero.Article>{ setting: { comment_paragraph_plugin_activate: true } };
            helper.detectChanges();
            expect(helper.component.isActivated()).toBeTruthy();
            expect(helper.all('.export-comment-button').length).toEqual(1);
        });

        it('return false when comment paragraph is not active', () => {
            expect(helper.component.isActivated()).toBeFalsy();
            expect(helper.all('.export-comment-button').length).toEqual(0);
        });

        it('return false when article has no setting attribute', () => {
            helper.component.article = <noosfero.Article>{};
            helper.detectChanges();
            expect(helper.component.isActivated()).toBeFalsy();
            expect(helper.all('.export-comment-button').length).toEqual(0);
        });

        it('not display export comment button when user does not have permission', () => {
            helper.component.article = <noosfero.Article>{ setting: { comment_paragraph_plugin_activate: true } };
            helper.detectChanges();
            expect(helper.find('.export-comment-button').attr('style')).toEqual("display: none; ");
        });
    });
});
