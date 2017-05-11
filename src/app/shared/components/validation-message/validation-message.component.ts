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

    constructor( @Inject('translatorService') public translatorService: TranslatorService) { }

    ngOnInit() {
        this.backendErrors = {};
        this.field.update.subscribe(() => {
            this.backendErrors = {};
        }
        );
    }

    translateError(errorObject: any) {
        let error: string;
        if (this.translatorService.hasTranslation(this.getCompleteErrorKey(errorObject.error))) {
            error = this.getCompleteErrorKey(errorObject.error);
        } else if (this.translatorService.hasTranslation(errorObject.error)) {
            error = errorObject.error;
        } else {
            error = errorObject.full_message;
        }
        return error;
    }

    setBackendErrors(errorObjects: any, equivalentFields = []) {
        let errorCollection = [];
        equivalentFields = equivalentFields.length > 0 ? equivalentFields : [this.field.name];

        equivalentFields.forEach(name => {
            if (errorObjects.errors && errorObjects.errors[name]) {
                errorObjects.errors[name].forEach(errorObject => {
                    errorCollection[this.translateError(errorObject)] = true;
                });
            }
        });

        this.field.control.setErrors(errorCollection);
    }

    getErrors() {
        let errors = [];
        if (this.field.errors) errors = errors.concat(Object.keys(this.field.errors));

        return errors;
    }

    dasherize(text: string) {
        return text.toLowerCase().replace(/\s/g, '-').replace(/\./g, '');
    }

    private getCompleteErrorKey(key: string) {
        return this.prefix ? this.prefix + "." + this.dasherize(key) : this.dasherize(key);
    }
}
