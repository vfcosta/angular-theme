import { CommentParagraphEventService } from './../events/comment-paragraph-event.service';
import { PermissionService } from './../../../app/shared/services/permission.service';
import { CommentParagraphService } from './../http/comment-paragraph.service';
import { ArticleService } from './../../../lib/ng-noosfero-api/http/article.service';
import { CommentService } from './../../../lib/ng-noosfero-api/http/comment.service';
import { PopoverModule } from 'ngx-bootstrap';
import { By } from '@angular/platform-browser';
import {AllowCommentComponent} from "./allow-comment.component";
import * as helpers from "../../../spec/helpers";
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Allow Comment Component", () => {
        let mocks = helpers.getMocks();

        let serviceMock = {
            commentParagraphCount: () => {
                return Promise.resolve(5);
            }
        };
        let functionToggleCommentParagraph: Function;
        let eventServiceMock = {
            subscribeToggleCommentParagraph: (fn: Function) => {
                functionToggleCommentParagraph = fn;
            }
        };

        let permissionServiceMock = {
            isAllowed: () => {
              return true;
            }
        };
        let fixture: ComponentFixture<AllowCommentComponent>;
        let component: AllowCommentComponent;
        let article = <any>{setting: {comment_paragraph_plugin_activate: true}, accept_comments: true};

        beforeEach(async(() => {
            spyOn(mocks.articleService, "getCurrent").and.returnValue(Promise.resolve(article));
            TestBed.configureTestingModule({
                declarations: [AllowCommentComponent],
                providers: [
                    { provide: ArticleService, useValue: mocks.articleService },
                    { provide: CommentService, useValue: mocks.commentService },
                    { provide: PermissionService, useValue: mocks.permissionService },
                    { provide: CommentParagraphService, useValue: serviceMock },
                    { provide: CommentParagraphEventService, useValue: eventServiceMock },
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [PopoverModule.forRoot()]
            });
            fixture = TestBed.createComponent(AllowCommentComponent);
            component = fixture.componentInstance;
            component.content = "";
            component.paragraphUuid = "uuid";
            component.article = article;
            fixture.detectChanges();
        }));

        it('update comments count', () => {
            expect(component.commentsCount).toEqual(5);
        });

        it('display paragraph content', () => {
            expect(fixture.debugElement.queryAll(By.css(".paragraph .paragraph-content")).length).toEqual(1);
        });

        it('display button to side comments', () => {
            expect(fixture.debugElement.queryAll(By.css(".paragraph .paragraph-actions a")).length).toEqual(1);
        });

        it('set display to true when click in show paragraph', () => {
            component.showParagraphComments();
            expect(component.display).toBeTruthy();
        });

        it('set display to false when click in hide paragraph', () => {
            component.hideParagraphComments();
            expect(component.display).toBeFalsy();
        });

        it('update article when receive a toogle paragraph event', () => {
            functionToggleCommentParagraph({ id: 2 });
            expect(component.article.id).toEqual(2);
        });

        it('not display button to side comments when comments was closed and there is no comment paragraph', () => {
            component.article.accept_comments = false;
            component.commentsCount = 0;
            expect(component.isActivated()).toBeFalsy();
        });

        it('display button to side comments when comments was closed and there is some comments to display', () => {
            component.article.accept_comments = false;
            component.commentsCount = 2;
            expect(component.isActivated()).toBeTruthy();
        });

        it('display button to side comments when the user has permission to edit the discussion even when comments was closed', () => {
            component.article.accept_comments = false;
            component.commentsCount = 0;
            expect(component.isAllowedShow()).toBeTruthy();
        });
    });
});
