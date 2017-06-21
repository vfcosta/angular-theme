import { Injectable, Output, EventEmitter, Inject } from '@angular/core';

@Injectable()
export class ThemeService {

    currentTheme: string;

    constructor(@Inject("$window") private $window: ng.IWindowService) { }

    verifyTheme(theme: string) {
        let reload = theme && this.currentTheme && this.currentTheme !== theme;
        if (reload) {
            this.$window.location.reload();
        }
        this.currentTheme = theme;
        return reload;
    }
}
