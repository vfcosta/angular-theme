import { Pipe, Inject } from '@angular/core';

@Pipe({name: 'dateFormat', pure: false})
export class DateFormatPipe {

    constructor(@Inject("amParseFilter") private amParseFilter: any) { }

    transform(date: string, options: any) {
        return this.amParseFilter(date, "YYYY/MM/DD HH:mm:ss").toISOString();
    }

}
