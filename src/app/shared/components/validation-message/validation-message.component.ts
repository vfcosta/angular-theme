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

    private pushErrors(errorObject: any) {
        console.log('###### errorObject', errorObject);
        let error: string;
        if (this.translatorService.hasTranslation(this.getCompleteErrorKey(errorObject.error))) {
            error = this.getCompleteErrorKey(errorObject.error);
        } else if (this.translatorService.hasTranslation(errorObject.error)) {
            error = errorObject.error;
        } else {
            error = errorObject.full_message;
        }
        // let errorKey = this.dasherize(errorObject.error);
        // console.log('%%%%% error:', error, '@@key@@', errorKey);
        let bli = {};
        bli = {error};

        let errors = {};
        let name: string = error;
        delete errorObject.error;
        errors[name] = errorObject;
console.log('********', errors);


        this.field.control.setErrors(errors);
        // console.log('%%%%% bli:', bli);
        
        // this.field.errors ? this.field.errors.push(error) : this.field.control.setErrors(bli);
    }

    // TODO: change this method name to pushBackendErrors
    setBackendErrors(errorObjects: any) {
        console.log('###### errorObjects', errorObjects, errorObjects.errors, this.field.name, errorObjects.errors[this.field.name]);
        if (errorObjects.errors && errorObjects.errors[this.field.name]) errorObjects.errors[this.field.name].forEach(errorObject => {
            this.pushErrors(errorObject);
        });
    }

    getErrors() {
        if (!this.field || !this.field.errors) {
            return [];
        } else {
            return Object.keys(this.field.errors);
        }
    }


    dasherize(text: string) {
        return text.toLowerCase().replace(/\s/g, '-').replace(/\./g, '');
    }

    private getCompleteErrorKey(key: string) {
        return this.prefix ? this.prefix + "." + this.dasherize(key) : this.dasherize(key);
    }

    // capitalizeFirstLetter(text: string) {
    //     return text.charAt(0).toUpperCase() + text.slice(1);
    // }
}
