import {CommentParagraphFormHotspotComponent} from "./comment-paragraph-form.component";
import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';
import * as helpers from "../../../spec/helpers";
import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';

let htmlTemplate = '<comment-paragraph-form-hotspot [comment]="ctrl.comment" [parent]="ctrl.parent"></comment-paragraph-form-hotspot>';

describe("Components", () => {
    describe("Comment Paragraph Form Hotspot Component", () => {

        let helper: ComponentTestHelper<CommentParagraphFormHotspotComponent>;

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [CommentParagraphFormHotspotComponent],
                providers: [],
                properties: {
                    comment: {}
                }
            });
            helper = new ComponentTestHelper<CommentParagraphFormHotspotComponent>(cls, done);
        });

        it('set paragraph uuid when parent has it setted', () => {
            helper.component.parent = <any>{ paragraph_uuid: 'uuid' };
            helper.detectChanges();
            expect((<any>helper.component.comment).paragraph_uuid).toEqual('uuid');
        });
    });
});
