import { By } from '@angular/platform-browser';
import { CustomContentComponent } from './custom-content.component';
import * as helpers from '../../../spec/helpers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';

describe("Components", () => {
    describe("Custom Content Component", () => {
        const mocks = helpers.getMocks();
        let fixture: ComponentFixture<CustomContentComponent>;
        let component: CustomContentComponent;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [CustomContentComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            });
            fixture = TestBed.createComponent(CustomContentComponent);
            component = fixture.componentInstance;
        }));

        it("display html content", () => {
            component.attribute = 'header';
            component.profile = <any>{ header: '<p class="test">TEST</p>' };
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".content")).nativeElement.innerHTML).toEqual(component.profile['header']);
        });
    });
});
