import {HtmlEditorComponent} from "./html-editor.component";
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe("Components", () => {
    describe("Html Editor Component", () => {
        let fixture: ComponentFixture<HtmlEditorComponent>;
        let component: HtmlEditorComponent;
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [HtmlEditorComponent],
                schemas: [NO_ERRORS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(HtmlEditorComponent);
                component = fixture.componentInstance;
            });
        }));

        it("render ckeditor", () => {
            component.object = { value: 'test' };
            component.attribute = 'value';
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css("ckeditor")).length).toEqual(1);
        });

        it("render nothing when object is null", () => {
            expect(fixture.debugElement.queryAll(By.css("ckeditor")).length).toEqual(0);
        });
    });
});
