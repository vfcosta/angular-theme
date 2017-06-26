import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../shared/services/translator.service';
import { CommentService } from './../../../lib/ng-noosfero-api/http/comment.service';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
import { Provider, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import * as helpers from "../../../spec/helpers";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommentsComponent } from './comments.component';

describe("Components", () => {
    describe("Comments Component", () => {

        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<CommentsComponent>;
        let component: CommentsComponent;

        beforeEach(async(() => {
            spyOn(mocks.commentService, 'getByArticle').and.returnValue( Promise.resolve(  [<noosfero.CommentViewModel>{ id: 2 }, <noosfero.CommentViewModel>{ id: 3 }] ) );

            TestBed.configureTestingModule({
                imports: [NgPipesModule, PaginationModule.forRoot(), FormsModule, TranslateModule.forRoot()],
                declarations: [CommentsComponent],
                providers: [
                    { provide: CommentService, useValue: mocks.commentService },
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            });
            fixture = TestBed.createComponent(CommentsComponent);
            component = fixture.componentInstance;
            component.article = <noosfero.Article>{ id: 1, parent: <any>null };
            component.comments =  [<noosfero.CommentViewModel>{ id: 2 }, <noosfero.CommentViewModel>{ id: 3 }];
        }));


        it("render comments associated to an article", fakeAsync( () => {
            fixture.detectChanges();
            component.ngOnInit();
            tick();
            expect(fixture.debugElement.queryAll(By.css("noosfero-comment")).length).toEqual(2);
        }));

        it("render a post comment tag", fakeAsync(() => {
            fixture.detectChanges();
            component.ngOnInit();
            tick();
            expect(fixture.debugElement.queryAll(By.css("noosfero-post-comment")).length).toEqual(1);
        }));

        it("update comments list when receive an reply",fakeAsync(() => {
            fixture.detectChanges();
            component.ngOnInit();
            component.parent = <any>{ id: 3 };
            component.commentAdded(<noosfero.Comment>{ id: 5, reply_of: { id: 3 } });
            fixture.detectChanges();
            tick();
            expect(fixture.debugElement.queryAll(By.css("noosfero-comment")).length).toEqual(3);
        }));

        it("load comments for next page",fakeAsync(() => {
            fixture.detectChanges();
            component.loadNextPage();
            fixture.detectChanges();
            tick();
            expect(component['page']).toEqual(3);
            expect(component.comments.length).toEqual(4);
            expect(component['total']).toEqual(4);
        }));

        it("not display more when there is no more comments to load",fakeAsync(() => {
            fixture.detectChanges();
            component.ngOnInit();
            tick();
            component['total'] = 0;
            component.parent = null;
            expect(component.displayMore()).toBeFalsy();
        }));

        it("remove comment when calling commentRemoved",fakeAsync(() => {
            fixture.detectChanges();
            component.ngOnInit();
            tick();
            let comment = { id: 1 };
            component.comments = <any>[comment];
            component.commentRemoved(<any>comment);
            expect(component.comments).toEqual([]);
        }));

        it("do nothing when call commentRemoved with a comment that doesn't belongs to the comments list",fakeAsync(() => {
            fixture.detectChanges();
            component.ngOnInit();
            tick();
            let comment = { id: 1 };
            component.comments = <any>[comment];
            component.commentRemoved(<any>{ id: 2 });
            expect(component.comments).toEqual([comment]);
        }));
    });
});
