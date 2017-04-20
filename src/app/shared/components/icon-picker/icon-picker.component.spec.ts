import { async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { IconPickerComponent } from './icon-picker.component';
import * as helpers from "../../../../spec/helpers";
import { By } from '@angular/platform-browser';

import { BsDropdownModule, BsDropdownMenuDirective, BsDropdownState, PositioningService, BsDropdownConfig, BsDropdownToggleDirective } from 'ngx-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';


describe("Components", () => {

    describe("Icon Picker Component", () => {

        let fixture: ComponentFixture<IconPickerComponent>;
        let component: IconPickerComponent;
        let dropdownMenu = {};

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BsDropdownModule.forRoot()],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                declarations: [IconPickerComponent]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(IconPickerComponent);
                component = fixture.componentInstance;
            });

        }));

        function renderDynamicDropDownMenu() {
            fixture.detectChanges();
            let toggleButton = fixture.nativeElement.querySelector('a');
            toggleButton.click();
            tick();
            fixture.detectChanges();
        }

        it("display available icons as options", fakeAsync(() => {
            renderDynamicDropDownMenu();
            expect(all('.icon-picker-item').length).toEqual(component.availableIcons.length);
        }));

        it("change current icon when select an option", fakeAsync(()  => {
            renderDynamicDropDownMenu();
            component.changeIcon("fa-plus");
            expect(all('.fa-plus').length).toEqual(1);
        }));

        function all(selector: string) {
            let compiled = fixture.debugElement;
            return compiled.queryAll(By.css(selector));
        }

    });
});
