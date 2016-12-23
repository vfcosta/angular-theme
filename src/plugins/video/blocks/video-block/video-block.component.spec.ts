import { provide } from 'ng-forward';
import { ComponentTestHelper, createClass } from './../../../../spec/component-test-helper';
import { VideoBlockComponent } from './video-block.component';
import * as helpers from "../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-video-plugin-video-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-video-plugin-video-block>';

describe("Components", () => {

    describe("Video Block Component", () => {

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
                        },
                        settings: {
                            url: "https://someurlvideo"
                        }
                    }
                }
            });
            helper = new ComponentTestHelper<VideoBlockComponent>(cls, done);
        });

        it("should have config url equals to block url parameter", () => {
            expect(helper.component.config.sources).toContain({ src: "https://someurlvideo", type: '' });
        });

        it("render video tag if has any video defined on block", () => {
            expect(helper.all("videogular").length).toEqual(1);
        });

        it("hide attribute block is false by default", () => {
            expect(helper.component.block.hide).toBeFalsy();
        });

        it("not render block if config has no settings", () => {
            (<any>helper.component.block).settings = {};
            helper.detectChanges();
            expect(helper.component.block.hide).toBeTruthy();
        });

        it("not render block if config has no url in settings", () => {
            (<any>helper.component.block.settings).url = '';
            helper.detectChanges();
            expect(helper.component.block.hide).toBeTruthy();
        });

        it("not render block if config has api_content equals to null", () => {
            (<any>helper.component.block).api_content = null;
            helper.component.ngOnInit();
            helper.detectChanges();
            expect(helper.component.block.hide).toBeTruthy();
        });
    });
});
