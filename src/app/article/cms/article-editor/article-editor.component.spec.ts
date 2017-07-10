import { SessionService } from './../../../login/session.service';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { ArticleEditorComponent } from './article-editor.component';
import * as helpers from '../../../../spec/helpers';

describe("Components", () => {
    describe("Article Editor Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<ArticleEditorComponent>;
        let component: ArticleEditorComponent;
        let window = {};

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ArticleEditorComponent],
                providers: [
                    { provide: SessionService, useValue: mocks.sessionService },
                    { provide: "Window", useValue: window },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            });
            fixture = TestBed.createComponent(ArticleEditorComponent);
            component = fixture.componentInstance;
            component.article = <noosfero.Article>{ type: "TextArticle", parent: { id: 20 } };
            component.profile = <noosfero.Profile>{ id: 10 };
        }));

        it("replace element with article basic editor when type is TextArticle", () => {
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('article-basic-editor')).length).toEqual(1);
        });
    });
});
