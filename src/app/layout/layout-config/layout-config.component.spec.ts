import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../shared/services/translator.service';
import { Component } from '@angular/core';
import { LayoutConfigComponent } from './layout-config.component';
import * as helpers from '../../../spec/helpers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap';
import { KeysPipe } from '../../shared/pipes/keys.filter';

describe("Layout Config Component", () => {
    let mocks = helpers.getMocks();
    let fixture: ComponentFixture<LayoutConfigComponent>;
    let component: LayoutConfigComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BsDropdownModule.forRoot(), TranslateModule.forRoot()],
            declarations: [LayoutConfigComponent, KeysPipe],
            providers: [
                { provide: TranslatorService, useValue: mocks.translatorService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(LayoutConfigComponent);
        component = fixture.componentInstance;
        component.owner =
            <noosfero.Profile>{
                id: 1,
                identifier: 'profile-name',
                type: 'Person',
                layout_template: 'default'
            };
        fixture.detectChanges();
    }));

    it("render template options", fakeAsync(() => {
        renderDynamicDropDownMenu();
        tick();
        expect(all('.layout-template-option').length).toEqual(8);
    }));

    it("is selected when current layout is equal to layout_template", () => {
        expect(component.isSelected('default')).toBeTruthy();
    });

    it("is not selected when current layout is not equal to layout_template", () => {
        expect(component.isSelected('other')).toBeFalsy();
    });

    it("add selected class in current template option", fakeAsync(() => {
        renderDynamicDropDownMenu();
        tick();
        expect(all('.layout-default.selected').length).toEqual(1);
    }));

    it("change owner layout when call changeLayout", () => {
        component.changeLayout("leftbar");
        expect(component.owner.layout_template).toEqual("leftbar");
    });

    function all(selector: string) {
        let compiled = fixture.debugElement;
        return compiled.queryAll(By.css(selector));
    }

    function renderDynamicDropDownMenu() {
        fixture.detectChanges();
        let toggleButton = fixture.nativeElement.querySelector('button');
        toggleButton.click();
        tick();
        fixture.detectChanges();
    }
});
