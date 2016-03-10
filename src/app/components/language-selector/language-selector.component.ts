import {Component, Inject} from "ng-forward";

@Component({
    selector: "language-selector",
    templateUrl: "app/components/language-selector/language-selector.html"
})
@Inject("$translate", "tmhDynamicLocale")
export class LanguageSelector {

    availableLanguages: any;

    constructor(private $translate: angular.translate.ITranslateService, private tmhDynamicLocale: any) {
        this.changeLanguage(tmhDynamicLocale.get() || $translate.use());
    }

    currentLanguage() {
        return this.$translate.use();
    }

    changeLanguage(language: string) {
        this.tmhDynamicLocale.set(language);
        this.$translate.use(language).then((lang) => {
            this.availableLanguages = {
                "en": this.$translate.instant("language.en"),
                "pt": this.$translate.instant("language.pt")
            };
        });
    }

}
