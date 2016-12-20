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
                            url: 'https://www.youtube.com/watch?v=BwXuu0gnIoE'
                        }
                    }
                });
            helper = new ComponentTestHelper<VideoBlockComponent>(cls, done);
        });

        it("should have config url equals 'https://www.youtube.com/watch?v=BwXuu0gnIoE'", () => {
            expect(helper.component.config.sources).toEqual({ src: 'https://www.youtube.com/watch?v=BwXuu0gnIoE', type: '' });
        });

    });
});
