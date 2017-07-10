import { Component, Inject } from '@angular/core';
import { TranslatorService } from '../../shared/services/translator.service';

@Component({
    selector: "language-selector",
    templateUrl: './language-selector.html',
    styleUrls: ['./language-selector.scss']
})
export class LanguageSelectorComponent {

    constructor(private translatorService: TranslatorService) { }

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
