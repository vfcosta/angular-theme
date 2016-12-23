import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';
import {INgForwardJQuery} from 'ng-forward/cjs/util/jqlite-extensions';
import * as helpers from '../../../spec/helpers';
import {DesignModeTogglerComponent} from './designModeToggler.component';
import {DesignModeService} from './designMode.service';
import {INoosferoLocalStorage} from "./../../shared/models/interfaces";

describe('DesignModeToggler Component', () => {
    const htmlTemplate: string = '<design-toggler></design-toggler>';

    let helper: ComponentTestHelper<DesignModeTogglerComponent>;
    beforeEach(() => {
        angular.mock.module('templates');
        angular.mock.module('ngSanitize');
        angular.mock.module('uiSwitch');
    });

    let designModeService: DesignModeService;
    let $localStorage = <INoosferoLocalStorage>{ currentUser: null, settings: { designMode: false } };
    beforeEach((done) => {
        designModeService = new DesignModeService($localStorage);
        let cls = createClass({
            template: htmlTemplate,
            directives: [DesignModeTogglerComponent],
            providers: [
                helpers.createProviderToValue('DesignModeService', designModeService),
                helpers.createProviderToValue('AuthService', helpers.mocks.authService),
            ]
        });
        helper = new ComponentTestHelper<DesignModeTogglerComponent>(cls, done);
    });

    it('display preview button if design mode is edit mode', () => {
        helper.component.inDesignMode = true;
        helper.detectChanges();
        expect(helper.all(".button-preview-mode").length).toEqual(1);
    });

    it('display edit button if design mode is not in edit mode', () => {
        helper.component.inDesignMode = false;
        helper.detectChanges();
        expect(helper.all(".button-edit-mode").length).toEqual(1);
    });

    it('emits event with value "true" when changing inDesignMode to On', (done) => {
        designModeService.setInDesignMode(false);
        designModeService.onToggle.subscribe((designModeOn: boolean) => {
            expect(designModeOn).toBeTruthy();
            done();
        });
        helper.component.inDesignMode = true;
        helper.detectChanges();
    });

    it('emits events with value "false" when changing inDesignMode to Off', (done) => {
        helper.component.inDesignMode = true;
        helper.detectChanges();

        designModeService.onToggle.subscribe((designModeOn: boolean) => {
            expect(designModeOn).toBeFalsy();
            done();
        });

        helper.component.inDesignMode = false;
        helper.detectChanges();
    });

    it('emits event with value "true" when toggle design mode', (done) => {
        designModeService.setInDesignMode(false);
        designModeService.onToggle.subscribe((designModeOn: boolean) => {
            expect(designModeOn).toBeTruthy();
            done();
        });
        helper.component.togleDesignMode();
        helper.detectChanges();
    });

    it('emits event with value "false" when toggle design mode', (done) => {
        designModeService.setInDesignMode(true);
        helper.detectChanges();
        designModeService.onToggle.subscribe((designModeOn: boolean) => {
            expect(designModeOn).toBeFalsy();
            done();
        });
        helper.component.togleDesignMode();
        helper.detectChanges();
    });

});
