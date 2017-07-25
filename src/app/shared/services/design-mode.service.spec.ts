import {DesignModeService} from './design-mode.service';
import * as helpers from '../../../spec/helpers';

describe('DesignMode Service', () => {
    let mocks = helpers.getMocks();
    let service: DesignModeService;

    beforeEach(() => {
        service = new DesignModeService(<any>mocks.localStorageService);
    });

    it('has the designModeOn equals false as default', () => {
        expect(service.isInDesignMode()).toBeFalsy();
    });

    it('allows set the designMode value', () => {
        spyOn(service.onToggle, 'next').and.stub();
        service.setInDesignMode(true);
        expect(service.isInDesignMode).toBeTruthy();
    });

    it('emits the onToggle event when changing the designModeOn property', () => {
        service.setInDesignMode(false);
        spyOn(service.onToggle, 'next').and.stub();
        service.setInDesignMode(true);
        expect(service.onToggle.next).toHaveBeenCalled();
    });

    it('does not emit onToggle event when there is no change on designModeOn property', () => {
        service.setInDesignMode(false);
        spyOn(service.onToggle, 'next').and.stub();
        service.setInDesignMode(false);
        expect(service.onToggle.next).not.toHaveBeenCalled();
    });
});
