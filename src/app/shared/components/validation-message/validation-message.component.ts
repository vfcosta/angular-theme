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

    pushError(errorObject: any, errorCollection: any) {
        let error: string;
        if (this.translatorService.hasTranslation(this.getCompleteErrorKey(errorObject.error))) {
            error = this.getCompleteErrorKey(errorObject.error);
        } else if (this.translatorService.hasTranslation(errorObject.error)) {
            error = errorObject.error;
        } else {
            error = errorObject.full_message;
        }
        let name: string = error;
        delete errorObject.error;

        errorCollection[name] = errorObject;

    }

    setBackendErrors(errorObjects: any) {
        let errorCollection = [];

        if (errorObjects.errors && errorObjects.errors[this.field.name]) errorObjects.errors[this.field.name].forEach(errorObject => {
            this.pushError(errorObject, errorCollection);
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
