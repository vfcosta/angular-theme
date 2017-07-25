import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from './../../../shared/services/notification.service';
import { TranslatorService } from './../../../shared/services/translator.service';
import { ArticleService } from './../../../../lib/ng-noosfero-api/http/article.service';
import { DateFormatPipe } from './../../../shared/pipes/date-format.pipe';
import { MomentModule } from 'angular2-moment';
import { PermissionNg2Directive } from './../../../shared/components/permission/permission.ng2.directive';
import { By } from '@angular/platform-browser';
import { Input, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ArticleDefaultViewComponent } from './article-default.component';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import * as helpers from '../../../../spec/helpers';

describe("Components", () => {
    describe("Article Default View Component", () => {
        let fixture: ComponentFixture<ArticleDefaultViewComponent>;
        let component: ArticleDefaultViewComponent;
        const mocks = helpers.getMocks();
        const article = <noosfero.Article>{ id: 1, profile: { identifier: "1" } };
        const watchFunctions: Function[] = [];
        let articleRemoved: Function;

        beforeEach(async(() => {
            spyOn(mocks.articleService, "getChildren").and.returnValue(Promise.resolve(null));
            spyOn(mocks.articleService, "remove").and.callThrough();
            spyOn(mocks.articleService, "subscribeToModelRemoved").and.callFake((fn: Function) => { articleRemoved = fn; } );
            spyOn(mocks.notificationService, 'confirmation').and.callThrough();
            TestBed.configureTestingModule({
                declarations: [ArticleDefaultViewComponent, PermissionNg2Directive, DateFormatPipe],
                providers: [
                    { provide: ArticleService, useValue: mocks.articleService },
                    { provide: TranslatorService, useValue: mocks.translatorService },
                    { provide: NotificationService, useValue: mocks.notificationService }
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [RouterTestingModule, MomentModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(ArticleDefaultViewComponent);
            component = fixture.componentInstance;
            component.article = article;
            component.profile = <noosfero.Profile>{};
        }));

        it("it should delete article when delete is activated", () => {
            spyOn(TestBed.get(Router), "navigate");
            expect(component.article).toEqual(article);
            doDeleteArticle();
            articleRemoved();
            expect(TestBed.get(Router).navigate).toHaveBeenCalled();
        });

        it("hide button to delete article when user doesn't have permission", () => {
            fixture.detectChanges();
            watchFunctions.forEach( (func: Function) => func());
            expect(fixture.debugElement.query(By.css('.article-toolbar .delete-article')).styles['display'].trim()).toEqual("none");
        });

        it("hide button to edit article when user doesn't have permission", () => {
            fixture.detectChanges();
            watchFunctions.forEach( (func: Function) => func());
            expect(fixture.debugElement.query(By.css('.article-toolbar .edit-article')).styles['display'].trim()).toEqual("none");
        });

        it("show button to edit article when user has permission", () => {
            component.article.permissions = ['allow_edit'];
            fixture.detectChanges();
            watchFunctions.forEach( (func: Function) => func());
            expect(fixture.debugElement.query(By.css('.article-toolbar .edit-article')).styles['display'].trim()).toEqual("");
        });

        it("show button to delete article when user has permission", () => {
            component.article.permissions = ['allow_delete'];
            fixture.detectChanges();
            watchFunctions.forEach( (func: Function) => func());
            expect(fixture.debugElement.query(By.css('.article-toolbar .delete-article')).styles['display'].trim()).toEqual("");
        });

        /**
         * Execute the delete method on the target component
         */
        function doDeleteArticle() {
            component.delete();
            expect(mocks.notificationService.confirmation).toHaveBeenCalled();
            component.doDelete();
            expect(mocks.articleService.remove).toHaveBeenCalled();
            // After the component delete method execution, fire the
            // ArticleEvent.removed event
            simulateRemovedEvent();
        }

        /**
         * Simulate the Notification Service confirmation and ArticleService
         * notifyArticleRemovedListeners event
         */
        function simulateRemovedEvent() {
            TestBed.get(NotificationService).confirmation({ title: "Title", message: "Message" }, () => { });
            TestBed.get(ArticleService).modelRemovedEventEmitter.next(article);
        }
    });

});
