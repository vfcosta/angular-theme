import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../../../app/shared/services/translator.service';
import { EventsHubService } from './../../../../../app/shared/services/events-hub.service';
import { By } from '@angular/platform-browser';
import { MyDatePickerModule } from 'mydatepicker';
import { ValidationMessageComponent } from './../../../../../app/shared/components/validation-message/validation-message.component';
import { FormsModule } from '@angular/forms';
import {DiscussionEditorComponent} from './discussion-editor.component';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from "../../../../../spec/helpers";

describe("Components", () => {
    describe("Discussion Editor Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<DiscussionEditorComponent>;
        let component: DiscussionEditorComponent;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [DiscussionEditorComponent, ValidationMessageComponent],
                providers: [
                    { provide: EventsHubService, useValue: mocks.eventsHubService },
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [FormsModule, MyDatePickerModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(DiscussionEditorComponent);
            component = fixture.componentInstance;
            component.article = <noosfero.Article>{};
        }));

        it("set start_date when it was defined in article", () => {
            let article = {start_date: new Date()};
            component.article = <any>article;
            fixture.detectChanges();
            expect(component.start_date.date.year).toEqual(article.start_date.getFullYear());
            expect(component.start_date.date.month).toEqual(article.start_date.getMonth() + 1);
            expect(component.start_date.date.day).toEqual(article.start_date.getDate());
        });

        it("set start_date as current date when it was not defined", () => {
            component.article = <noosfero.Article>{};
            fixture.detectChanges();
            expect(component.start_date.date.year).toBeDefined();
            expect(component.start_date.date.month).toBeDefined();
            expect(component.start_date.date.day).toBeDefined();
        });

        it("set end_date as article end_date when it was defined", () => {
            let article = {end_date: new Date()};
            component.article = <any>article;
            fixture.detectChanges();
            expect(component.end_date.date.year).toEqual(article.end_date.getFullYear());
            expect(component.end_date.date.month).toEqual(article.end_date.getMonth() + 1);
            expect(component.end_date.date.day).toEqual(article.end_date.getDate());
        });
    });
});
