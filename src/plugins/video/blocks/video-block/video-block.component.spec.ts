import { provide } from 'ng-forward';
import { ComponentTestHelper, createClass } from './../../../../spec/component-test-helper';
import { VideoBlockComponent } from './video-block.component';
import * as helpers from "../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-video-plugin-video-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-video-plugin-video-block>';

describe("Components", () => {

    describe("Section Block Component", () => {

        let helper: ComponentTestHelper<VideoBlockComponent>;

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [VideoBlockComponent],
                properties: {
                    block: {
                        api_content: {
                            url: "https://someurlvideo",
                            mime_type: ''
                        }
                    }
                }
            });
            helper = new ComponentTestHelper<VideoBlockComponent>(cls, done);
        });

        it("should have config url equals to block url paramter", () => {
            expect(helper.component.config.sources).toContain({ src: "https://someurlvideo", type: '' });
        });

        it("render video tag if has any video defined on block", () => {
            expect(helper.all("videogular").length).toEqual(1);
        });

        it("not render block if config has no api_content", () => {
            (<any>helper.component.block).api_content = {};
            helper.component.ngOnInit();
            expect(helper.component.block.hide).toBeTruthy();
        });

        it("not render block if config has no url in api_content", () => {
            (<any>helper.component.block).api_content = { url: '' };
            helper.component.ngOnInit();
            expect(helper.component.block.hide).toBeTruthy();
        });

    });
});
