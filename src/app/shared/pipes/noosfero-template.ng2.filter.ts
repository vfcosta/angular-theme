import {Pipe} from "@angular/core";

@Pipe({name: 'noosferoTemplate', pure: false})
export class NoosferoTemplatePipe {

    transform(text: string, options: any) {
        for (let option in options) {
            text = text.replace('{' + option + '}', options[option]);
        }
        return text;
    }

}
