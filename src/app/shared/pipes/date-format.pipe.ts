import { Pipe, Inject } from '@angular/core';

declare var moment;

@Pipe({name: 'dateFormat', pure: false})
export class DateFormatPipe {

    transform(date: string, options: any) {
        return moment(date, "YYYY/MM/DD HH:mm:ss").toISOString();
    }
}
