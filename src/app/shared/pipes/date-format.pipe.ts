import { Pipe, Inject, PipeTransform } from '@angular/core';

@Pipe({name: 'dateFormat', pure: false})
export class DateFormatPipe implements PipeTransform {

    transform(date: string, options: any) {
        return date;
    }
}
