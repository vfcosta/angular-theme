import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../shared/services/translator.service';
import { ArticleService } from './../../../../lib/ng-noosfero-api/http/article.service';
import { TaskAcceptComponent } from './../../task-list/task-accept.component';
import { FormsModule } from '@angular/forms';
import * as helpers from '../../../../spec/helpers';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { ApproveArticleTaskAcceptComponent } from './approve-article-task-accept.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Approve Article Task Accept Component", () => {
        const mocks = helpers.getMocks();
        let fixture: ComponentFixture<ApproveArticleTaskAcceptComponent>;
        let component: ApproveArticleTaskAcceptComponent;
        const articles = [{ id: 1, title: "folder1" }, { id: 2, title: "folder2" }];
        const task = <any>{ target: { id: 5, identifier: "profile" }, data: {} };

        beforeEach(async(() => {
            spyOn(mocks.articleService, "getByProfile").and.returnValue(Promise.resolve({ headers: () => { }, data: articles }));
            const taskAcceptComponent = {task: task, confirmationTask: {}};
            TestBed.configureTestingModule({
                declarations: [ApproveArticleTaskAcceptComponent],
                providers: [
                    { provide: TranslatorService, useValue: mocks.translatorService },
                    { provide: ArticleService, useValue: mocks.articleService },
                    { provide: TaskAcceptComponent, useValue: taskAcceptComponent },
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [FormsModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(ApproveArticleTaskAcceptComponent);
            component = fixture.componentInstance;
            component.task = task;
            component.confirmationTask = task;
        }));

        it("set folder array with folders as options", fakeAsync(() => {
            fixture.detectChanges();
            tick();
            expect(TestBed.get(ArticleService).getByProfile).toHaveBeenCalled();
            expect(component.folders.map((f) => f.id)).toEqual([null, 1, 2]);
            expect(component.folders.map((f) => f.path)).toEqual(["profile", "profile/folder1", "profile/folder2"]);
        }));
    });
});
