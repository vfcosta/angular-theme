import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { ArticleService } from './../../../../lib/ng-noosfero-api/http/article.service';
import { By } from '@angular/platform-browser';
import {DiscussionBlockComponent} from './discussion-block.component';
import * as helpers from './../../../../spec/helpers';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';

describe("Components", () => {
    describe("Discussion Block Component", () => {
        let mocks = helpers.getMocks();
        let settingsObj = {};
        let article = <noosfero.Article>{ name: "article1" };
        let profile = { name: 'profile-name' };
        let fixture: ComponentFixture<DiscussionBlockComponent>;
        let component: DiscussionBlockComponent;
        let onRemove: Function;

        beforeEach(async(() => {
            spyOn(mocks.blockService, "getApiContent").and.returnValue(Promise.resolve({ articles: [article], headers: (name: string) => { return name; } }));
            mocks.articleService.subscribeToModelRemoved = (fn: Function) => { onRemove = fn; };
            TestBed.configureTestingModule({
                declarations: [DiscussionBlockComponent],
                providers: [
                    { provide: BlockService, useValue: mocks.blockService },
                    { provide: ArticleService, useValue: mocks.articleService },
                ],
                schemas: [NO_ERRORS_SCHEMA],
            });
            fixture = TestBed.createComponent(DiscussionBlockComponent);
            component = fixture.componentInstance;
            component.block = {};
            fixture.detectChanges();
        }));

        it("get discussions from the block service", () => {
            expect(component.documents).toEqual(<any>[jasmine.objectContaining({ name: "article1" })]);
            expect(component.block.hide).toEqual(false);
        });

        it("verify removed article has been removed from list", fakeAsync(() => {
            tick();
            expect(component.documents.length).toEqual(1);
            simulateRemovedEvent();
            expect(component.documents.length).toEqual(0);
        }));

        it("presentAbstract return true if block presentation mode is title_and_abstract", () => {
            component.block = { settings: { presentation_mode: 'title_and_abstract' } };
            component.ngOnInit();
            expect(component.presentAbstract()).toEqual(true);
        });

        it("presentAbstract return false if block presentation mode is title_only", () => {
            component.block = { settings: { presentation_mode: 'title_only' } };
            component.ngOnInit();
            expect(component.presentAbstract()).toEqual(false);
        });

        it("presentAbstract return true if block presentation mode is full_content", () => {
            component.block = { settings: { presentation_mode: 'full_content' } };
            component.ngOnInit();
            expect(component.presentAbstract()).toEqual(false);
        });

        it("presentAbstract display abstract content", () => {
            component.block = { settings: { presentation_mode: 'title_and_abstract' } };
            component.ngOnInit();
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('.abstract')).length).toEqual(1);
        });

        it("presentFullContent return true if block presentation mode is full_content", () => {
            component.block = { settings: { presentation_mode: 'full_content' } };
            component.ngOnInit();
            expect(component.presentFullContent()).toEqual(true);
        });

        it("presentFullContent return false if block presentation mode is title_only", () => {
            component.block = { settings: { presentation_mode: 'title_only' } };
            component.ngOnInit();
            expect(component.presentFullContent()).toEqual(false);
        });

        it("presentFullContent return true if block presentation mode is title_and_abstract", () => {
            component.block = { settings: { presentation_mode: 'title_and_abstract' } };
            component.ngOnInit();
            expect(component.presentFullContent()).toEqual(false);
        });

        it("presentAbstract display full content", () => {
            component.block = { settings: { presentation_mode: 'full_content' } };
            component.ngOnInit();
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('noosfero-default-article')).length).toEqual(1);
        });

        /**
         * Simulate the ArticleService ArticleEvent.removed event
         */
        function simulateRemovedEvent() {
            onRemove(article);
        }
    });
});
