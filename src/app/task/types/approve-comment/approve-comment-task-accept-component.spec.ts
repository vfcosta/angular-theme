import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../shared/services/translator.service';
import { ArticleService } from './../../../../lib/ng-noosfero-api/http/article.service';
import { TaskAcceptComponent } from './../../task-list/task-accept.component';
import { UiSrefDirective } from '../../../shared/directives/ui-sref-directive';
import { Provider, Component } from '@angular/core';
import * as helpers from "../../../../spec/helpers";
import { ApproveCommentTaskAcceptComponent } from './approve-comment-task-accept.component';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Approve Comment Task Accept Component", () => {

        let article = { id: 1 };
        let task = <any>{ target: { id: 5 }, data: { comment_attributes: "{\"body\":\"comment body\",\"source_id\":4}" } };

        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<ApproveCommentTaskAcceptComponent>;
        let component: ApproveCommentTaskAcceptComponent;

        beforeEach(async(() => {
            spyOn(mocks.articleService, 'get').and.returnValue(Promise.resolve({ headers: () => { }, data: article }));
            let taskAcceptComponent = {task: task, confirmationTask: {}};
            TestBed.configureTestingModule({
                declarations: [ApproveCommentTaskAcceptComponent, UiSrefDirective],
                providers: [
                    { provide: ArticleService, useValue: mocks.articleService },
                    { provide: "$state", useValue: mocks.$state },
                    { provide: "$transitions", useValue: mocks.$transitions },
                    { provide: TranslatorService, useValue: mocks.translatorService },
                    { provide: TaskAcceptComponent, useValue: taskAcceptComponent },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(ApproveCommentTaskAcceptComponent);
            component = fixture.componentInstance;
            component.task = task;
            component.confirmationTask = task;
            fixture.detectChanges();
        }));

        it("verify if task contains comment attributes", () => {
            expect(component.task.data.comment_attributes).toBeTruthy();
        });

        it("display comment for approval", () => {
            expect(component.comment.body).toEqual("comment body");
            expect(all('noosfero-comment').length).toEqual(1);
        });

        it("call article service to load article", () => {
            expect(mocks.articleService.get).toHaveBeenCalledWith(4);
        });

        it("verify if article is setted when article service is called", fakeAsync(() => {
            tick();
            expect(mocks.articleService.get).toHaveBeenCalledWith(4);
            expect(component.article.id).toEqual(1);
        }));

        function all(selector: string) {
            let compiled = fixture.debugElement;
            return compiled.queryAll(By.css(selector));
        }
    });
});
