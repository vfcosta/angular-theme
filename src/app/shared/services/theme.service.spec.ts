import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('Theme Service', () => {

    const location = jasmine.createSpyObj('location', ['reload']);
    const window = <Window>{location: location};
    const environment = { production: true };

    it('not reload location when current theme is null', () => {
        const service = new ThemeService(window, environment);
        service.currentTheme = null;
        service.verifyTheme('other-theme');
        expect(location.reload).not.toHaveBeenCalled();
    });

    it('reload location when theme is different than current theme', () => {
        const service = new ThemeService(window, environment);
        service.currentTheme = 'current-theme';
        service.verifyTheme('other-theme');
        expect(location.reload).toHaveBeenCalled();
    });
});
