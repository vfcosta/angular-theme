import {Component, Inject} from "ng-forward";
import {LanguageService} from "./language.service";

@Component({
    selector: "language-selector",
    templateUrl: "app/components/language-selector/language-selector.html"
})
@Inject(LanguageService)
export class LanguageSelector {

    constructor(private languageService: LanguageService) { }

    currentLanguage() {
        return this.languageService.currentLanguage();
    }

    changeLanguage(language: string) {
        this.languageService.changeLanguage(language);
    }

    availableLanguages() {
        return this.languageService.availableLanguages;
    }
}
