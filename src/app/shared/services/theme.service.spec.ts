import { ThemeService } from './theme.service';

describe("Theme Service", () => {

    let location = jasmine.createSpyObj("location", ["reload"]);
    let window = <Window>{location: location};

    it("not reload location when current theme is null", () => {
        let service = new ThemeService(window);
        service.currentTheme = null;
        service.verifyTheme("other-theme");
        expect(location.reload).not.toHaveBeenCalled();
    });

    it("reload location when theme is different than current theme", () => {
        let service = new ThemeService(window);
        service.currentTheme = "current-theme";
        service.verifyTheme("other-theme");
        expect(location.reload).toHaveBeenCalled();
    });
});
