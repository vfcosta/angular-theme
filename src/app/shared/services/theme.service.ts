import { Injectable, Output, EventEmitter, Inject } from 'ng-forward';
import { INoosferoLocalStorage } from "..//models/interfaces";

@Injectable()
@Inject("$window")
export class ThemeService {

    currentTheme: string;

    constructor(private $window: ng.IWindowService) { }

    verifyTheme(theme: string) {
        let reload = theme && this.currentTheme && this.currentTheme !== theme;
        if (reload) {
            this.$window.location.reload();
        }
        this.currentTheme = theme;
        return reload;
    }
}
