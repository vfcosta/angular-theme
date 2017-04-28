import { Inject } from '@angular/core';
import { TranslatorService } from './../../services/translator.service';
import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
    selector: "validation-message",
    template: require('app/shared/components/validation-message/validation-message.html')
})
export class ValidationMessageComponent {

    @Input() field: NgModel;
    @Input() prefix: string;

    backendErrors: any;

    constructor(@Inject('translatorService') public translatorService: TranslatorService) {}

    ngOnInit() {
        this.backendErrors = {};
    }

    setBackendErrors(errorObjects: any) {
        if (!errorObjects) return;
        if (errorObjects["errors_details"][this.field.name]) {
            this.backendErrors["errors_details"] = errorObjects["errors_details"][this.field.name];
        }
        if (errorObjects["errors_messages"][this.field.name]) {
            this.backendErrors["errors_messages"] = errorObjects["errors_messages"][this.field.name];
        }
    }

    getFrontendErrors() {
        if (!this.field || !this.field.errors) return [];
        return Object.keys(this.field.errors).map(key => this.prefix + "." + this.dasherize(key));
    }

    dasherize(text: string) {
        return text.toLowerCase().replace(/\s/g, '-').replace(/\./g, '');
    }

    hasBackendErrors(): boolean {
        return Object.keys(this.backendErrors).length > 0;
    }

    getBackendErrors() {
        let errors = [];
        let errorIndex = 0;
        if (!this.field || !this.hasBackendErrors()) return [];

        // 1st try to get the translation of the field name + error code...
        this.backendErrors["errors_details"].forEach(error_key => {
            if (this.translatorService.hasTranslation(this.prefix + "." + this.dasherize(error_key.error)) ) {
                errors.push(this.translatorService.translate(this.prefix + "." + this.dasherize(error_key.error)));
            }else {
                // ...Then try to get the translation of the error code
                if (this.translatorService.hasTranslation(this.dasherize(error_key.error))) {
                    errors.push(this.translatorService.translate(this.dasherize(error_key.error)));
                }else {
                    // Uses the translated message that comes from Grape API, remember to build the translations in advance by running:
                    // rake updatepo
                    // rake makemo
                    errors.push(this.capitalizeFirstLetter(this.backendErrors["errors_messages"][errorIndex]));
                }
            }
            ++errorIndex;
        });
        return errors;
    }

    capitalizeFirstLetter(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}

