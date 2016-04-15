import {PostCommentEventService} from "./post-comment-event.service";
import {ComponentTestHelper, createClass} from '../../../../spec/component-test-helper';
import * as helpers from "../../../../spec/helpers";
import {Provider} from 'ng-forward';
import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';

describe("Services", () => {
    describe("Comment Paragraph Event Service", () => {
        let eventService: PostCommentEventService;

        beforeEach(() => {
            eventService = new PostCommentEventService();
            eventService['eventEmitter'] = jasmine.createSpyObj("eventEmitter", ["next", "subscribe"]);
        });

        it('subscribe to post comment event', () => {
            eventService.subscribe(() => { });
            expect(eventService['eventEmitter'].subscribe).toHaveBeenCalled();
        });

        it('emit event when post comment', () => {
            eventService.emit(<noosfero.Comment>{});
            expect(eventService['eventEmitter'].next).toHaveBeenCalled();
        });
    });
});
