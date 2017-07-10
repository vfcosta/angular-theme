import {CommentParagraphEventService} from './comment-paragraph-event.service';
import * as helpers from '../../../spec/helpers';

describe("Services", () => {
    describe("Comment Paragraph Event Service", () => {
        let eventService: CommentParagraphEventService;

        beforeEach(() => {
            eventService = new CommentParagraphEventService();
            eventService['toggleCommentParagraphEmitter'] = jasmine.createSpyObj("toggleCommentParagraphEmitter", ["next", "subscribe"]);
        });

        it('subscribe to toggle comment paragraph event', () => {
            eventService['toggleCommentParagraphEmitter'].subscribe = jasmine.createSpy("subscribe");
            eventService.subscribeToggleCommentParagraph(() => { });
            expect(eventService['toggleCommentParagraphEmitter'].subscribe).toHaveBeenCalled();
        });

        it('emit event when toggle comment paragraph', () => {
            eventService['toggleCommentParagraphEmitter'].subscribe = jasmine.createSpy("next");
            eventService.toggleCommentParagraph(<noosfero.Article>{});
            expect(eventService['toggleCommentParagraphEmitter'].next).toHaveBeenCalled();
        });
    });
});
