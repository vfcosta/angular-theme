import { DateFormatPipe } from './../../../shared/pipes/date-format.pipe';
import { NgPipesModule } from 'ngx-pipes';
import { MomentModule } from 'angular2-moment';
import { UiSrefDirective } from './../../../shared/directives/ui-sref-directive';
import { DisplayContentBlockComponent } from './display-content-block.component';
import * as helpers from './../../../../spec/helpers';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

describe("Components", () => {
    describe("Display Content Block Component", () => {
        let fixture: ComponentFixture<DisplayContentBlockComponent>;
        let component: DisplayContentBlockComponent;

        let sections: noosfero.Section[] = [
            { value: 'abstract', checked: 'abstract' },
            { value: 'title', checked: 'title' }
        ];
        let settings: noosfero.Settings = {
            limit: 6,
            sections: sections
        };

        let articles = [
            {name: 'article 1', title: 'article 1', path: 'article-1', abstract: '', publish_date: '2016', body: '', author: '', created_at: '2016'},
            {name: 'article 2', title: 'article 1', path: 'article-2', abstract: '', publish_date: '2016', body: '', author: '', created_at: '2016'}
        ];
        let articleService = jasmine.createSpyObj("ArticleService", ["getByProfile"]);
        articleService.getByProfile = jasmine.createSpy("getByProfile").and.returnValue(Promise.resolve({ headers: () => { }, data: articles }));

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NgPipesModule, MomentModule],
                declarations: [DisplayContentBlockComponent, TranslatePipe, UiSrefDirective, DateFormatPipe],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [
                    { provide: "articleService", useValue: articleService },
                    { provide: "translatorService", useValue: helpers.mocks.translatorService }
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(DisplayContentBlockComponent);
                component = fixture.componentInstance;
                component.owner = <noosfero.Profile>{ id: 1, name: 'profile-name', identifier: 'profile-name' };
                component.block = <noosfero.Block>{id: 1, type: 'DisplayContentBlock', settings: settings};
            }).catch( error => {
                console.log(error);
            });
        }));

        it("verify abstract is displayed", () => {
            expect(all("div[innerHtml|='article.abstract']")[0]).not.toBeNull;
        });

        it("verify title is displayed", () => {
            expect(all("div > h5")[0]).not.toBeNull;
        });

        it("verify body is not displayed", () => {
            expect(all("div[innerHtml|='article.body']")[0]).toBeNull;
        });

        function all(selector: string) {
            let compiled = fixture.debugElement;
            return compiled.queryAll(By.css(selector));
        }
    });
});
