import { Component, Inject } from '@angular/core';
import { TranslatorService } from "../../shared/services/translator.service";

@Component({
    selector: "language-selector",
    template: require('app/layout/language-selector/language-selector.html')
})
export class LanguageSelectorComponent {

    constructor(@Inject("translatorService") private translatorService: TranslatorService) { }

    currentLanguage() {
        return this.translatorService.currentLanguage();
    }

    changeLanguage(language: string) {
        this.translatorService.changeLanguage(language);
    }

    availableLanguageKeys(): Array<string> {
        return Object.keys(this.translatorService.availableLanguages);
    }

    languageDescription(lang: string) {
        return this.translatorService.availableLanguages[lang];
    }
}
