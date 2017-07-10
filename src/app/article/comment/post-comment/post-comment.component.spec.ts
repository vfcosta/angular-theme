import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from './../../../shared/services/notification.service';
import { TranslatorService } from './../../../shared/services/translator.service';
import { SessionService } from './../../../login/session.service';
import { CommentService } from './../../../../lib/ng-noosfero-api/http/comment.service';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import * as helpers from '../../../../spec/helpers';
import { PostCommentComponent } from './post-comment.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe("Components", () => {
    describe("Post Comment Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<PostCommentComponent>;
        let component: PostCommentComponent;

        beforeEach(async(() => {
            spyOn(mocks.commentService, "createInArticle").and.callThrough();
            TestBed.configureTestingModule({
                declarations: [PostCommentComponent],
                providers: [
                    { provide: CommentService, useValue: mocks.commentService },
                    { provide: SessionService, useValue: mocks.sessionService },
                    { provide: NotificationService, useValue: mocks.notificationService },
                    { provide: TranslatorService, useValue: mocks.translatorService },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [FormsModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(PostCommentComponent);
            component = fixture.componentInstance;
            component.article = <noosfero.Article>{ id: 1, accept_comments: true };
            component.comment = <noosfero.Comment>{ id: 2 };
        }));

        it("render the post comment form", () => {
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css("form")).length).toEqual(1);
        });

        it("not render the post comment form when article doesn't accept comments", () => {
            fixture.detectChanges();
            component.article.accept_comments = false;
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css("form")).length).toEqual(0);
        });

        it("emit an event when create comment", fakeAsync(() => {
            component.commentSaved.next = jasmine.createSpy("next");
            component.save();
            tick();
            expect(component.commentSaved.next).toHaveBeenCalled();
        }));

        it("notify success when create comment", fakeAsync(() => {
            component["notificationService"].success = jasmine.createSpy("success");
            component.save();
            tick();
            expect(component["notificationService"].success).toHaveBeenCalled();
        }));

        it("set the reply id when reply to a comment", () => {
            component.comment = <any>{ reply_of_id: null };
            component.parent = <any>{ id: 10 };
            component.save();
            expect(component.comment.reply_of_id).toEqual(component.parent.id);
        });

        it("render alert when not logged in", () => {
            component['currentUser'] = null;
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css("form .post-comment-logged-in")).length).toEqual(0);
            expect(fixture.debugElement.queryAll(By.css("form .post-comment-not-logged-in")).length).toEqual(1);
        });
    });
});
