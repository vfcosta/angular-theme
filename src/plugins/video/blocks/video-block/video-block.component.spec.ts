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
                    url: `https://www.youtube.com/watch?v=BwXuu0gnIoE`,
                    platform: `youtube`,
                    width: 400,
                    height: 330,
                    config: ""
                }
            });
            helper = new ComponentTestHelper<VideoBlockComponent>(cls, done);
        });

        it("should have url equals 'https://www.youtube.com/watch?v=BwXuu0gnIoE'", () => {
            expect(helper.component.url).toEqual("https://www.youtube.com/watch?v=BwXuu0gnIoE");
        });

        it("should have platform equals to 'youtube'", () => {
            expect(helper.component.platform).toEqual("youtube");
        });

        it("should have width equal to 400", () => {
            expect(helper.component.width).toEqual(400);
        });

        it("should have height equals 330", () => {
            expect(helper.component.height).toEqual(330);
        });

        it("should have config url equals 'https://www.youtube.com/watch?v=BwXuu0gnIoE'", () => {
            expect(helper.component.config.sources).toEqual({ src: 'https://www.youtube.com/watch?v=BwXuu0gnIoE', type: '' });
        });

    });
});
