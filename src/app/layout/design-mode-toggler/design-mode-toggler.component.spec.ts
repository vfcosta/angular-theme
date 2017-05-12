import { TranslatePipe } from '../../shared/pipes/translate-pipe';
import * as helpers from '../../../spec/helpers';
import { DesignModeTogglerComponent } from './design-mode-toggler.component';
import { INoosferoLocalStorage } from "./../../shared/models/interfaces";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('DesignModeToggler Component', () => {

    let $localStorage = <INoosferoLocalStorage>{ currentUser: null, settings: { designMode: false } };
    let mocks = helpers.getMocks();
    let fixture: ComponentFixture<DesignModeTogglerComponent>;
    let component: DesignModeTogglerComponent;
    beforeEach(async(() => {
        spyOn(mocks.designModeService, 'isInDesignMode').and.callThrough();
        TestBed.configureTestingModule({
            declarations: [DesignModeTogglerComponent, TranslatePipe],
            providers: [
                { provide: "designModeService", useValue: mocks.designModeService },
                { provide: "authService", useValue: mocks.authService },
                { provide: "translatorService", useValue: mocks.translatorService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(DesignModeTogglerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('display preview button if design mode is edit mode', () => {
        TestBed.get("designModeService").setInDesignMode(true);
        fixture.detectChanges();
        expect(all(".button-preview-mode").length).toEqual(1);
    });

    it('display edit button if design mode is not in edit mode', () => {
        //mocks.designModeService.setInDesignMode(false);
        TestBed.get("designModeService").setInDesignMode(false);
        fixture.detectChanges();
        expect(all(".button-edit-mode").length).toEqual(1);
    });

    it('emits event with value "true" when changing inDesignMode to On', fakeAsync(() => {
        mocks.designModeService.setInDesignMode(false);
        mocks.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            expect(designModeOn).toBeTruthy();
        });
        component.inDesignMode = true;
    }));

    it('emits events with value "false" when changing inDesignMode to Off', fakeAsync((done) => {
        component.inDesignMode = true;

        mocks.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            expect(designModeOn).toBeFalsy();
            done();
        });

        component.inDesignMode = false;
    }));

    it('emits event with value "true" when toggle design mode', fakeAsync((done) => {
        mocks.designModeService.setInDesignMode(false);
        mocks.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            expect(designModeOn).toBeTruthy();
            done();
        });
        component.togleDesignMode();
    }));

    it('emits event with value "false" when toggle design mode', fakeAsync((done) => {
        mocks.designModeService.setInDesignMode(true);
        mocks.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            expect(designModeOn).toBeFalsy();
            done();
        });
        component.togleDesignMode();
    }));

    function all(selector: string) {
        let compiled = fixture.debugElement;
        return compiled.queryAll(By.css(selector));
    }
});
