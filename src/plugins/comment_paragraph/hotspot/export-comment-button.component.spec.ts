import { hotspots } from './../../recent_activities/index';
import { ArticleToolbarHotspotComponent } from './../../../app/hotspot/article-toolbar-hotspot.component';
import { SharedModule } from './../../../app/shared.module';
import { By } from '@angular/platform-browser';
import { TranslatePipe } from './../../../app/shared/pipes/translate-pipe';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ExportCommentButtonHotspotComponent } from "./export-comment-button.component";
import * as helpers from "../../../spec/helpers";
import { PermissionDirective } from '../../../app/shared/components/permission/permission.directive';

describe("Components", () => {
    describe("Export Comment Button Hotspot Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<ArticleToolbarHotspotComponent>;
        let component: ArticleToolbarHotspotComponent;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ArticleToolbarHotspotComponent],
                providers: [
                    { provide: "translatorService", useValue: mocks.translatorService },
                    { provide: "$scope", useValue: mocks.scopeWithEvents() },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [SharedModule]
            });
            fixture = TestBed.createComponent(ArticleToolbarHotspotComponent);
            component = fixture.componentInstance;
            component.article = <noosfero.Article>{};
        }));

        it('return true when comment paragraph is active', () => {
            component.article = <noosfero.Article>{ setting: { comment_paragraph_plugin_activate: true } };
            fixture.detectChanges();
            let hotspotComponent = fixture.debugElement.query(By.css('export-comment-button-hotspot')).componentInstance;
            expect(hotspotComponent.isActivated()).toBeTruthy();
            expect(fixture.debugElement.queryAll(By.css('.export-comment-button')).length).toEqual(1);
        });

        it('return false when comment paragraph is not active', () => {
            fixture.detectChanges();
            let hotspotComponent = fixture.debugElement.query(By.css('export-comment-button-hotspot')).componentInstance;
            expect(hotspotComponent.isActivated()).toBeFalsy();
            expect(fixture.debugElement.queryAll(By.css('.export-comment-button')).length).toEqual(0);
        });

        it('return false when article has no setting attribute', () => {
            component.article = <noosfero.Article>{};
            fixture.detectChanges();
            let hotspotComponent = fixture.debugElement.query(By.css('export-comment-button-hotspot')).componentInstance;
            expect(hotspotComponent.isActivated()).toBeFalsy();
            expect(fixture.debugElement.queryAll(By.css('.export-comment-button')).length).toEqual(0);
        });
    });
});
