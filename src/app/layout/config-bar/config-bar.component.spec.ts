import { DesignModeService } from './../../shared/services/design-mode.service';
import { Component } from '@angular/core';
import { ConfigBarComponent } from './config-bar.component';
import * as helpers from '../../../spec/helpers';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { PermissionNg2Directive } from '../../shared/components/permission/permission.ng2.directive';

describe("ConfigBar Component", () => {
    let mocks = helpers.getMocks();
    let fixture: ComponentFixture<ConfigBarComponent>;
    let component: ConfigBarComponent;

    beforeEach(async(() => {
        spyOn(mocks.designModeService, 'isInDesignMode').and.returnValue(false);

        TestBed.configureTestingModule({
            declarations: [ConfigBarComponent, PermissionNg2Directive],
            providers: [
                { provide: DesignModeService, useValue: mocks.designModeService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        });
        fixture = TestBed.createComponent(ConfigBarComponent);
        component = fixture.componentInstance;
        component.owner = <noosfero.Profile> {id: 1, permissions: ['allow_edit']};
    }));

    it('verify if on toggle subscribe is called', fakeAsync( () => {
        TestBed.get(DesignModeService).setInDesignMode(false);
        mocks.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            expect(designModeOn).toBeTruthy();
        });
        component.designModeOn = true;

    }));

    it('verify if design mode is initialized correctly', () => {
        fixture.detectChanges();
        expect(component.designModeService.isInDesignMode).toHaveBeenCalled();
        expect(component.designModeOn).toBeFalsy();
    });
});
