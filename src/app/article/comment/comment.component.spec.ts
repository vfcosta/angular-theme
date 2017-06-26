import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from './../../shared/services/notification.service';
import { TranslatorService } from './../../shared/services/translator.service';
import { CommentService } from './../../../lib/ng-noosfero-api/http/comment.service';
import { PermissionNg2Directive } from '../../shared/components/permission/permission.ng2.directive';
import { DateFormatPipe } from './../../shared/pipes/date-format.pipe';
import { MomentModule } from 'angular2-moment';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import * as helpers from "../../../spec/helpers";
import { CommentComponent } from './comment.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Comment Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<CommentComponent>;
        let component: CommentComponent;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [CommentComponent, DateFormatPipe, PermissionNg2Directive],
                providers: [
                    { provide: CommentService, useValue: mocks.commentService },
                    { provide: NotificationService, useValue: mocks.notificationService },
                    { provide: "amParseFilter", useValue: mocks.amParseFilter },
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [MomentModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(CommentComponent);
            component = fixture.componentInstance;
            component.article = <noosfero.Article>{ id: 1, accept_comments: true };
            component.comment = <any>{ title: "title", body: "body" };
        }));

        it("render a comment", () => {
            expect(fixture.debugElement.queryAll(By.css(".comment")).length).toEqual(1);
        });

        it("not render a post comment tag in the beginning", () => {
            expect(fixture.debugElement.queryAll(By.css("noosfero-post-comment")).length).toEqual(0);
        });

        it("set show reply to true when click reply", () => {
            component.reply();
            expect(component.showReply()).toBeTruthy("Reply was expected to be true");
        });

        it("show reply relies on current comment __showReply attribute", () => {
            (<any>component.comment).__showReply = false;
            expect(component.showReply()).toEqual(false);
        });

        it("display reply button", () => {
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css(".comment .actions .reply")).length).toEqual(1);
        });

        it("not display reply button when accept_comments is false", () => {
            component.article['accept_comments'] = false;
            expect(fixture.debugElement.queryAll(By.css(".comment .actions .reply")).length).toEqual(0);
        });

        it("does not show the Remove button if user is not allowed to remove", () => {
            component.allowRemove = () => false;
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css("a.action.remove")).length).toEqual(0);
        });

        it("shows the Remove button if user is allowed to remove", () => {
            component.allowRemove = () => true;
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css("a.action.remove")).length).toEqual(1);
        });

        it("call comment service to remove comment", () => {
            TestBed.get(NotificationService).confirmation = (params: any, func: Function) => { func(); };
            TestBed.get(CommentService).removeFromArticle = jasmine.createSpy("removeFromArticle").and.returnValue(Promise.resolve());
            component.remove();
            expect(TestBed.get(CommentService).removeFromArticle).toHaveBeenCalled();
        });
    });
});
