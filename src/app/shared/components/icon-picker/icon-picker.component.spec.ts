import { async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { IconPickerComponent } from './icon-picker.component';
import { By } from '@angular/platform-browser';

import { BsDropdownModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';


describe("Components", () => {

    describe("Icon Picker Component", () => {

        let fixture: ComponentFixture<IconPickerComponent>;
        let component: IconPickerComponent;
        const dropdownMenu = {};

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BsDropdownModule.forRoot()],
                declarations: [IconPickerComponent]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(IconPickerComponent);
                component = fixture.componentInstance;
            });

        }));

        function renderDynamicDropDownMenu() {
            fixture.detectChanges();
            const toggleButton = fixture.nativeElement.querySelector('a');
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
            const compiled = fixture.debugElement;
            return compiled.queryAll(By.css(selector));
        }

    });
});
