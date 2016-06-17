import {DesignModeService} from './designMode.service';

describe('DesignMode Service', () => {
    let service: DesignModeService;

    beforeEach(() => {
        service = new DesignModeService();
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
        spyOn(service.onToggle, 'next').and.stub();
        service.setInDesignMode(true);
        expect(service.onToggle.next).toHaveBeenCalled();
    });

    it('does not emit onToggle event when there is no change on designModeOn property', () => {
        spyOn(service.onToggle, 'next').and.stub();
        service.setInDesignMode(false);
        expect(service.onToggle.next).not.toHaveBeenCalled();
    });
});