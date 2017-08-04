import { Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
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
        translateService.setDefaultLang(this.localStorageService.retrieve('language') || translateService.getBrowserLang() || 'en');
    }

    currentLanguage() {
        return this.translateService.currentLang;
    }

    changeLanguage(language: string): any {
        if (!language) {
            console.log("WARN: language undefined");
            return;
        }
        moment.locale(language);
        this.localStorageService.store('language', language);
        return this.translateService.use(language);
    }

    translate(text: string, interpolateParams?: any, interpolationId?: string) {
        return this.translateService.instant(text, interpolateParams);
    }

    hasTranslation(text: string): boolean {
        return text !== this.translate(text);
    }
}
