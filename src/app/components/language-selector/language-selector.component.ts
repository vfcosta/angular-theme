import {Component, Inject} from "ng-forward";
import {TranslatorService} from "../translator/translator.service";

@Component({
    selector: "language-selector",
    templateUrl: "app/components/language-selector/language-selector.html"
})
@Inject(TranslatorService)
export class LanguageSelector {

    constructor(private translatorService: TranslatorService) { }

    currentLanguage() {
        return this.translatorService.currentLanguage();
    }

    changeLanguage(language: string) {
        this.translatorService.changeLanguage(language);
    }

    availableLanguages() {
        return this.translatorService.availableLanguages;
    }
}
