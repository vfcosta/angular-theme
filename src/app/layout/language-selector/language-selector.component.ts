import {Component, Inject} from "ng-forward";
import {TranslatorService} from "../../shared/services/translator.service";

@Component({
    selector: "language-selector",
    templateUrl: "app/layout/language-selector/language-selector.html"
})
@Inject(TranslatorService)
export class LanguageSelectorComponent {

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
