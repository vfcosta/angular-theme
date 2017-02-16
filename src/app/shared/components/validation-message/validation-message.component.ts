import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
    selector: "validation-message",
    template: require('app/shared/components/validation-message/validation-message.html')
})
export class ValidationMessageComponent {

    @Input() field: NgModel;
    @Input() prefix: string;

    setErrors(messages: any) {
        if (!messages) return;
        let errors = {};
        for (let error of messages) {
            errors[error] = true;
        }
        this.field.control.setErrors(errors);
    }

    getErrors() {
        if (!this.field || !this.field.errors) return null;
        return Object.keys(this.field.errors).map(key => this.prefix + "." + this.dasherize(key));
    }

    dasherize(text: string) {
        return text.toLowerCase().replace(/\s/g, '-').replace(/\./g, '');
    }
}
