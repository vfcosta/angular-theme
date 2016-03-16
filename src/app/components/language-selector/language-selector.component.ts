import {Component, Inject} from "ng-forward";

@Component({
    selector: "language-selector",
    templateUrl: "app/components/language-selector/language-selector.html"
})
@Inject("$translate", "tmhDynamicLocale", "amMoment", "angularLoad")
export class LanguageSelector {

    availableLanguages: any;

    constructor(private $translate: angular.translate.ITranslateService,
        private tmhDynamicLocale: any,
        private amMoment: any,
        private angularLoad: any) {

        this.configAvailableLanguages();
        this.changeLanguage(tmhDynamicLocale.get() || $translate.use());
    }

    currentLanguage() {
        return this.$translate.use();
    }

    changeLanguage(language: string) {
        this.changeMomentLocale(language);
        this.tmhDynamicLocale.set(language);
        this.angularLoad.loadScript(`/bower_components/messageformat/locale/${language}.js`).then(() => {
            return this.$translate.use(language);
        }).then(() => {
            this.configAvailableLanguages();
        });
    }

    private configAvailableLanguages() {
        this.availableLanguages = {
            "en": this.$translate.instant("language.en"),
            "pt": this.$translate.instant("language.pt")
        };
    }

    private changeMomentLocale(language: string) {
        let localePromise = Promise.resolve();
        if (language != "en") {
            localePromise = this.angularLoad.loadScript(`/bower_components/moment/locale/${language}.js`);
        }
        localePromise.then(() => {
            this.amMoment.changeLocale(language);
        });
    }
}
