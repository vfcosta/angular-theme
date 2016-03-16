import {Injectable, Inject} from "ng-forward";

@Injectable()
@Inject("$translate", "tmhDynamicLocale", "amMoment", "angularLoad", "$rootScope")
export class LanguageService {

    availableLanguages: any;

    constructor(private $translate: angular.translate.ITranslateService,
        private tmhDynamicLocale: angular.dynamicLocale.tmhDynamicLocaleService,
        private amMoment: any,
        private angularLoad: any,
        private $rootScope: any) {

        this.configAvailableLanguages();
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
        this.angularLoad.loadScript(`/bower_components/messageformat/locale/${language}.js`).then(() => {
            return this.$translate.use(language);
        }).then(() => {
            this.configAvailableLanguages();
        });
    }

    translate(text: string) {
        return this.$translate.instant(text);
    }

    private configAvailableLanguages() {
        this.availableLanguages = {
            "en": this.$translate.instant("language.en"),
            "pt": this.$translate.instant("language.pt")
        };
    }

    private changeMomentLocale(language: string) {
        let localePromise = Promise.resolve();
        if (language !== "en") {
            localePromise = this.angularLoad.loadScript(`/bower_components/moment/locale/${language}.js`);
        }
        localePromise.then(() => {
            this.amMoment.changeLocale(language);
        });
    }
}
