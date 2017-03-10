import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';
import {HtmlEditorComponent} from "./html-editor.component";
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe("Components", () => {
    describe("Html Editor Component", () => {
        let fixture: ComponentFixture<HtmlEditorComponent>;
        let component: HtmlEditorComponent;
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [HtmlEditorComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(HtmlEditorComponent);
                component = fixture.componentInstance;
            });
        }));

        it("render a textarea", () => {
            expect(fixture.debugElement.queryAll(By.css("textarea")).length).toEqual(1);
        });
    });
});
