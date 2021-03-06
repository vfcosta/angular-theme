import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../app/shared/services/translator.service';
import { CommentParagraphService } from './../http/comment-paragraph.service';
import { CommentService } from './../../../lib/ng-noosfero-api/http/comment.service';
import { NgPipesModule } from 'ngx-pipes';
import { SideCommentsComponent } from './side-comments.component';
import * as helpers from '../../../spec/helpers';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Side Comments Component", () => {
        const mocks = helpers.getMocks();
        let fixture: ComponentFixture<SideCommentsComponent>;
        let component: SideCommentsComponent;
        const serviceMock = jasmine.createSpyObj("CommentParagraphService", ["getByArticle"]);
        serviceMock.getByArticle = jasmine.createSpy("getByArticle").and.returnValue(Promise.resolve({ data: [] }));

        const postCommentEventService = jasmine.createSpyObj("postCommentEventService", ["emit", "subscribe"]);
        postCommentEventService.subscribe = jasmine.createSpy("subscribe");

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [SideCommentsComponent],
                providers: [
                    { provide: CommentParagraphService, useValue: serviceMock },
                    { provide: CommentService, useValue: mocks.commentService },
                    { provide: "postCommentEventService", useValue: postCommentEventService },
                    { provide: TranslatorService, useValue: mocks.translatorService },
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [NgPipesModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(SideCommentsComponent);
            component = fixture.componentInstance;
            component.paragraphUuid = "uuid";
        }));

        it('call service to load paragraph comments', () => {
            component.loadComments();
            expect(serviceMock.getByArticle).toHaveBeenCalled();
        });

        it('set paragraph uuid in new comment object', () => {
            fixture.detectChanges();
            expect(component.newComment['paragraph_uuid']).toEqual('uuid');
        });
    });
});
