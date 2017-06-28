import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {MainBlockComponent} from './main-block.component';

describe("Components", () => {
    describe("Main Block Component", () => {
        let fixture: ComponentFixture<MainBlockComponent>;
        let component: MainBlockComponent;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [MainBlockComponent],
                schemas: [NO_ERRORS_SCHEMA],
            });
            fixture = TestBed.createComponent(MainBlockComponent);
            component = fixture.componentInstance;
        }));

        it("check if the main block has a tag with ui-view attribute", () => {
            expect(fixture.debugElement.queryAll(By.css('[ui-view="mainBlockContent"]')).length).toEqual(1);
        });
    });
});
