import {Injectable, Inject} from "ng-forward";
import * as moment from 'moment';


@Injectable()
@Inject("$translate", "tmhDynamicLocale", "amMoment", "angularLoad", "$rootScope")
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

    constructor(private $translate: angular.translate.ITranslateService,
        private tmhDynamicLocale: angular.dynamicLocale.tmhDynamicLocaleService,
        private amMoment: any,
        private angularLoad: any,
        private $rootScope: any) {

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
        this.changeMomentLocale(language);
        this.tmhDynamicLocale.set(language);
        return this.$translate.use(language);
    }

    translate(text: string) {
        return this.$translate.instant(text);
    }

    private changeMomentLocale(language: string) {
        let localePromise = Promise.resolve();
        if (language !== "en") {
            localePromise = this.angularLoad.loadScript(`/bower_components/moment/locale/${language}.js`);
        }
        localePromise.then(() => {
            this.amMoment.changeLocale(language);
            moment.locale(language);
        });
    }
}
