import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../shared/services/translator.service';
import { ArticleService } from './../../../../lib/ng-noosfero-api/http/article.service';
import { DateFormatPipe } from './../../../shared/pipes/date-format.pipe';
import { NgPipesModule } from 'ngx-pipes';
import { MomentModule } from 'angular2-moment';
import { DisplayContentBlockComponent } from './display-content-block.component';
import * as helpers from './../../../../spec/helpers';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

describe("Components", () => {
    describe("Display Content Block Component", () => {
        let fixture: ComponentFixture<DisplayContentBlockComponent>;
        let component: DisplayContentBlockComponent;
        const mocks = helpers.getMocks();

        const sections: noosfero.Section[] = [
            { value: 'abstract', checked: 'abstract' },
            { value: 'title', checked: 'title' }
        ];
        const settings: any = {
            limit: 6,
            sections: sections
        };

        const articles = [
            {name: 'article 1', title: 'article 1', path: 'article-1', abstract: '', publish_date: '2016', body: '', author: '', created_at: '2016'},
            {name: 'article 2', title: 'article 1', path: 'article-2', abstract: '', publish_date: '2016', body: '', author: '', created_at: '2016'}
        ];
        const articleService = jasmine.createSpyObj("ArticleService", ["getByProfile"]);
        articleService.getByProfile = jasmine.createSpy("getByProfile").and.returnValue(Promise.resolve({ headers: () => { }, data: articles }));

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule, NgPipesModule, MomentModule, TranslateModule.forRoot()],
                declarations: [DisplayContentBlockComponent, DateFormatPipe],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [
                    { provide: ArticleService, useValue: articleService },
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ]
            });
            fixture = TestBed.createComponent(DisplayContentBlockComponent);
            component = fixture.componentInstance;
            component.owner = <noosfero.Profile>{ id: 1, name: 'profile-name', identifier: 'profile-name' };
            component.block = <noosfero.Block>{id: 1, type: 'DisplayContentBlock', settings: settings};
        }));

        it("verify abstract is displayed", () => {
            expect(all("div[innerHtml|='article.abstract']")[0]).not.toBeNull();
        });

        it("verify title is displayed", () => {
            expect(all("div > h5")[0]).not.toBeNull();
        });

        it("verify body is not displayed", () => {
            expect(all("div[innerHtml|='article.body']")[0]).toBeUndefined();
        });

        function all(selector: string) {
            const compiled = fixture.debugElement;
            return compiled.queryAll(By.css(selector));
        }
    });
});
