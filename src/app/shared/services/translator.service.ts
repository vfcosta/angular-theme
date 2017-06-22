import {Injectable, Inject} from "@angular/core";
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

    constructor(@Inject("$translate") private $translate: angular.translate.ITranslateService,
        @Inject("tmhDynamicLocale") private tmhDynamicLocale: angular.dynamicLocale.tmhDynamicLocaleService,
        @Inject("$rootScope") private $rootScope: any) {

        this.$rootScope.$on("$localeChangeSuccess", () => {
            this.changeLanguage(tmhDynamicLocale.get() || $translate.use());
        });
    }

    currentLanguage() {
        return this.$translate.use();
    }

    changeLanguage(language: string) {
        if (!language) {
            console.log("WARN: language undefined");
            return;
        }
        moment.locale(language);
        this.tmhDynamicLocale.set(language);
        return this.$translate.use(language);
    }

    translate(text: string, interpolateParams?: any, interpolationId?: string) {
        return this.$translate.instant(text, interpolateParams, interpolationId);
    }

    hasTranslation(text: string): boolean {
        return text !== this.translate(text);
    }
}
