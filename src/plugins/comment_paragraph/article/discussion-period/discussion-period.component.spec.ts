import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../../app/shared/services/translator.service';
import { DateFormatPipe } from './../../../../app/shared/pipes/date-format.pipe';
import { MomentModule } from 'angular2-moment';
import { DiscussionPeriodComponent } from './discussion-period.component';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from "../../../../spec/helpers";

describe("Components", () => {
    describe("Discussion Period Component", () => {
        let fixture: ComponentFixture<DiscussionPeriodComponent>;
        let component: DiscussionPeriodComponent;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [DiscussionPeriodComponent, DateFormatPipe],
                providers: [
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [MomentModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(DiscussionPeriodComponent);
            component = fixture.componentInstance;
            component.article = <noosfero.Article>{};
        }));

        it("return false in isDiscussion when no type was specified", () => {
            expect(component.isDiscussion()).toBeFalsy();
        });

        it("return false in isDiscussion when other type was specified", () => {
            component.article = <noosfero.Article>{ type: "TextArticle" };
            expect(component.isDiscussion()).toBeFalsy();
        });

        it("return true in isDiscussion when discussion type was specified", () => {
            component.article = <noosfero.Article>{ type: "CommentParagraphPlugin::Discussion" };
            expect(component.isDiscussion()).toBeTruthy();
        });

        it("return true in notOpened when start date is after today", () => {
            let date = new Date();
            date.setDate(date.getDate() + 1);
            component.article = <noosfero.Article>{ start_date: date.toISOString() };
            expect(component.notOpened()).toBeTruthy();
            expect(component.available()).toBeFalsy();
            expect(component.closed()).toBeFalsy();
        });

        it("return false in notOpened when start date is before today", () => {
            let date = new Date();
            date.setDate(date.getDate() - 1);
            component.article = <noosfero.Article>{ start_date: date.toISOString() };
            expect(component.notOpened()).toBeFalsy();
        });

        it("return false in notOpened when start date is null", () => {
            component.article = <noosfero.Article>{ start_date: null };
            expect(component.notOpened()).toBeFalsy();
        });

        it("return true in closed when end date is before today", () => {
            let date = new Date();
            date.setDate(date.getDate() - 1);
            component.article = <noosfero.Article>{ end_date: date.toISOString() };
            expect(component.closed()).toBeTruthy();
            expect(component.available()).toBeFalsy();
            expect(component.notOpened()).toBeFalsy();
        });

        it("return false in closed when start date is after today", () => {
            let date = new Date();
            date.setDate(date.getDate() + 1);
            component.article = <noosfero.Article>{ end_date: date.toISOString() };
            expect(component.closed()).toBeFalsy();
        });

        it("return false in closed when end date is null", () => {
            component.article = <noosfero.Article>{ start_date: null };
            expect(component.closed()).toBeFalsy();
        });

        it("return true in available when start date is before today and end date is after", () => {
            let date = new Date();
            date.setDate(date.getDate() - 1);
            let startDate = date.toISOString();
            date.setDate(date.getDate() + 3);
            let endDate = date.toISOString();
            component.article = <noosfero.Article>{ start_date: startDate, end_date: endDate };
            expect(component.available()).toBeTruthy();
            expect(component.closed()).toBeFalsy();
            expect(component.notOpened()).toBeFalsy();
        });

        it("return true in available when start date is before today and end date is null", () => {
            let date = new Date();
            date.setDate(date.getDate() - 1);
            let startDate = date.toISOString();
            component.article = <noosfero.Article>{ start_date: startDate, end_date: null };
            expect(component.available()).toBeTruthy();
            expect(component.closed()).toBeFalsy();
            expect(component.notOpened()).toBeFalsy();
        });

        it("return true in available when start date is null and end date is after today", () => {
            let date = new Date();
            date.setDate(date.getDate() + 3);
            let endDate = date.toISOString();
            component.article = <noosfero.Article>{ start_date: null, end_date: endDate };
            expect(component.available()).toBeTruthy();
            expect(component.closed()).toBeFalsy();
            expect(component.notOpened()).toBeFalsy();
        });
    });
});
