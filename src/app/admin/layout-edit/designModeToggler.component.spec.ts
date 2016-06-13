import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';
import * as helpers from '../../../spec/helpers';
import {DesignModeTogglerComponent} from './designModeToggler.component';
import {DesignModeService} from './designMode.service';

describe('DesignModeToggler Component', () => {
    const htmlTemplate: string = '<noosfero-design-toggler></noosfero-design-toggler>';

    let helper: ComponentTestHelper<DesignModeTogglerComponent>;
    beforeEach(() => {
        angular.mock.module('templates');
        angular.mock.module('ngSanitize');
        angular.mock.module('toggle-switch');
    });

    let designModeService: DesignModeService;
    beforeEach((done) => {
        designModeService = new DesignModeService();
        let cls = createClass({
            template: htmlTemplate,
            directives: [DesignModeTogglerComponent],
            providers: [
                helpers.createProviderToValue('DesignModeService', designModeService)
            ]
        });
        helper = new ComponentTestHelper<DesignModeTogglerComponent>(cls, done);
    });

    it('changes css classes representing the switch is on or off', () => {
        expect(helper.debugElement.query('div.switch-animate').hasClass('switch-off')).toBeTruthy();
        expect(helper.debugElement.query('div.switch-animate').hasClass('switch-on')).toBeFalsy();
        helper.component.inDesignMode = true;
        helper.detectChanges();
        expect(helper.debugElement.query('div.switch-animate').hasClass('switch-on')).toBeTruthy();
        expect(helper.debugElement.query('div.switch-animate').hasClass('switch-off')).toBeFalsy();
    });

    it('emits event with value "true" when changing inDesignMode to On', (done) => {
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
});