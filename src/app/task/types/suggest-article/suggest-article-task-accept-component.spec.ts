import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../shared/services/translator.service';
import { ArticleService } from './../../../../lib/ng-noosfero-api/http/article.service';
import { TaskAcceptComponent } from './../../task-list/task-accept.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import * as helpers from "../../../../spec/helpers";
import { SuggestArticleTaskAcceptComponent } from './suggest-article-task-accept.component';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Suggest Article Task Accept Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<SuggestArticleTaskAcceptComponent>;
        let component: SuggestArticleTaskAcceptComponent;
        let articles = [{ id: 1, title: "folder1" }, { id: 2, title: "folder2" }];
        let task = <any>{ target: { id: 5, identifier: "profile" }, data: {article: {}} };

        beforeEach(async(() => {
            spyOn(mocks.articleService, 'getByProfile').and.returnValue(Promise.resolve({ headers: () => { }, data: articles }));
            let taskAcceptComponent = {task: task, confirmationTask: {}};
            TestBed.configureTestingModule({
                declarations: [SuggestArticleTaskAcceptComponent],
                providers: [
                    { provide: ArticleService, useValue: mocks.articleService },
                    { provide: TranslatorService, useValue: mocks.translatorService },
                    { provide: TaskAcceptComponent, useValue: taskAcceptComponent },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [FormsModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(SuggestArticleTaskAcceptComponent);
            component = fixture.componentInstance;
            component.task = task;
            component.confirmationTask = task;
        }));

        it("set folder array with folders as options", fakeAsync(() => {
            fixture.detectChanges();
            expect(TestBed.get(ArticleService).getByProfile).toHaveBeenCalled();
            tick();
            expect(component.folders.map((f) => { return f.id; })).toEqual([null, 1, 2]);
            expect(component.folders.map((f) => { return f.path; })).toEqual(["profile", "profile/folder1", "profile/folder2"]);
        }));

        it("display article body for edition", () => {
            expect(fixture.debugElement.queryAll(By.css(".suggest-article-accept article-basic-editor")).length).toEqual(1);
        });
    });
});
