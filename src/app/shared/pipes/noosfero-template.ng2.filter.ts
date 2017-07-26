import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'noosferoTemplate', pure: false})
export class NoosferoTemplatePipe implements PipeTransform {

    transform(text: string, options: any) {
        if (!options) return text;
        for (const option of Object.keys(options)) {
            text = text.replace('{' + option + '}', options[option]);
        }
        return text;
    }
}
