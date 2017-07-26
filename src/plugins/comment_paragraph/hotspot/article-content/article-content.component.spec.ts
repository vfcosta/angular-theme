import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../../app/shared/services/translator.service';
import { DateFormatPipe } from './../../../../app/shared/pipes/date-format.pipe';
import { MomentModule } from 'angular2-moment';
import { DiscussionPeriodComponent } from './../../article/discussion-period/discussion-period.component';
import { By } from '@angular/platform-browser';
import { ArticleContentHotspotComponent } from './../../../../app/hotspot/article-content-hotspot.component';
import { CommentParagraphArticleContentHotspotComponent } from './article-content.component';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from '../../../../spec/helpers';

describe("Components", () => {
    describe("Article Content Hotspot Component", () => {
        let fixture: ComponentFixture<CommentParagraphArticleContentHotspotComponent>;
        let component: CommentParagraphArticleContentHotspotComponent;
        const mocks = helpers.getMocks();

        beforeEach(async(() => {
            const articleContentHotspotComponent = {};
            TestBed.configureTestingModule({
                declarations: [CommentParagraphArticleContentHotspotComponent, DiscussionPeriodComponent, DateFormatPipe],
                providers: [
                    { provide: TranslatorService, useValue: mocks.translatorService },
                    { provide: ArticleContentHotspotComponent, useValue: articleContentHotspotComponent }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [MomentModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(CommentParagraphArticleContentHotspotComponent);
            component = fixture.componentInstance;
            component.article = <noosfero.Article>{ type: "CommentParagraphPlugin::Discussion" };
        }));

        it('display period content', () => {
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('.period')).length).toEqual(1);
        });
    });
});
