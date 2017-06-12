import { DateFormatPipe } from './../../../shared/pipes/date-format.pipe';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { RecentDocumentsBlockComponent } from './recent-documents-block.component';
import * as helpers from "./../../../../spec/helpers";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NgPipesModule } from 'ngx-pipes';
import { MomentModule } from 'angular2-moment';
import { By } from '@angular/platform-browser';

describe("Components", () => {
    describe("Recent Documents Block Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<RecentDocumentsBlockComponent>;
        let component: RecentDocumentsBlockComponent;
        let article = <noosfero.Article>{ name: "article1" };

        beforeEach(async(() => {
            spyOn(mocks.articleService, 'subscribeToModelRemoved');
            spyOn(mocks.blockService, 'getApiContent').and.callThrough();
            spyOn(mocks.$state, 'go');

            TestBed.configureTestingModule({
                declarations: [RecentDocumentsBlockComponent, TranslatePipe, DateFormatPipe],
                providers: [
                    { provide: "blockService", useValue: mocks.blockService },
                    { provide: "$state", useValue: mocks.$state },
                    { provide: "articleService", useValue: mocks.articleService },
                    { provide: "amParseFilter", useValue: mocks.amParseFilter }
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [NgPipesModule, MomentModule]
            });
            fixture = TestBed.createComponent(RecentDocumentsBlockComponent);
            component = fixture.componentInstance;
            component.block = <noosfero.Block>{ id: 1 };
            component.owner = <noosfero.Profile>{ identifier: 'identifier' };
        }));

        it("verify getApiContent is called ", fakeAsync(() => {
            component['blockService'].getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({}));
            component.ngOnInit();
            tick();
            expect(component['blockService'].getApiContent).toHaveBeenCalledWith(component.block);
        }));

        it("set documents getting content from api ", fakeAsync(() => {
            let articles = [{ id: 1 }];
            component['blockService'].getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({ articles: articles }));
            component.ngOnInit();
            tick();
            expect(component.documents).toBe(articles);
        }));

        it("verify subscribeToModelRemoved is called", fakeAsync(() => {
            component.ngOnInit();
            tick();
            expect(component['articleService'].subscribeToModelRemoved).toHaveBeenCalled();
        }));

        // FIXME put this test to works
        // it("verify removed article has been removed from list", fakeAsync(() => {
        //     let articles = [article];
        //     component['blockService'].getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({ articles: articles }));
        //     component.ngOnInit();
        //     tick();
        //     expect(component.documents.length).toEqual(1);
        //     simulateRemovedEvent(component);
        //     expect(component.documents.length).toEqual(0);
        // }));
        // /**
        //  * Simulate the ArticleService ArticleEvent.removed event
        //  */
        // function simulateRemovedEvent(recentDocumentsBlock: RecentDocumentsBlockComponent) {
        //     recentDocumentsBlock['articleService']['modelRemovedEventEmitter'].next(article);
        // }

    });

});
