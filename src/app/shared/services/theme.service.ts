import { Injectable, Output, EventEmitter, Inject } from '@angular/core';

@Injectable()
export class ThemeService {

    currentTheme: string;

    constructor(@Inject('Window') private window: Window, @Inject('environment') private environment: any) { }

    verifyTheme(theme: string) {
        const reload = theme && this.currentTheme && this.currentTheme !== theme;
        if (reload && this.environment.production) {
            this.window.location.reload();
        }
        this.currentTheme = theme;
        return reload;
    }
}
