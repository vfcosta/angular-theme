import { CamelizePipe, UnderscorePipe } from 'ngx-pipes/src/app/pipes/string';
import { Inject } from '@angular/core';
import { TranslatorService } from './../../services/translator.service';
import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
    selector: "validation-message",
    templateUrl: './validation-message.html',
    providers: [UnderscorePipe]
})
export class ValidationMessageComponent {

    @Input() field: NgModel;
    @Input() prefix: string;

    private aditionalFields = [];

    constructor(public translatorService: TranslatorService, private underscorePipe: UnderscorePipe) { }

    getErrorKey(errorObject: any) {
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

    pushAditionalField(field: string) {
        this.aditionalFields.push(field);
    }

    setBackendErrors(errorObjects: any) {
        const errorCollection = {};
        const fields = this.aditionalFields;
        fields.push(this.field.name);
        fields.forEach(name => {
            const item = errorObjects.errors[name] ? errorObjects.errors[name] : errorObjects.errors[this.underscorePipe.transform(name)];
            if (errorObjects.errors && item) {
                item.forEach(errorObject => {
                    const key = this.getErrorKey(errorObject);
                    errorCollection[key] = true;
                });
            }
        });
        if (Object.keys(errorCollection).length > 0) this.field.control.setErrors(errorCollection);
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
