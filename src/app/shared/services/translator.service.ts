import { Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';
import * as moment from 'moment';

@Injectable()
export class TranslatorService {

    availableLanguages = {
        "en" : "English",
        "pt" : "Português"
        // "fr" : "Français",
        // "hy" : "հայերեն լեզու",
        // "de" : "Deutsch",
        // "ru" : "русский язык",
        // "es" : "Español",
        // "eo" : "Esperanto",
        // "it" : "Italiano"
    };

    constructor(private translateService: TranslateService, private localStorageService: LocalStorageService) {
        translateService.setDefaultLang(localStorageService.get<string>("language") || translateService.getBrowserLang() || 'en');
    }

    currentLanguage() {
        return this.translateService.currentLang;
    }

    changeLanguage(language: string) {
        if (!language) {
            console.log("WARN: language undefined");
            return;
        }
        moment.locale(language);
        this.localStorageService.set("language", language);
        return this.translateService.use(language);
    }

    translate(text: string, interpolateParams?: any, interpolationId?: string) {
        return this.translateService.instant(text, interpolateParams);
    }

    hasTranslation(text: string): boolean {
        return text !== this.translate(text);
    }
}
