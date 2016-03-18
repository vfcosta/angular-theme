import {Pipe, Inject} from "ng-forward";

@Pipe("dateFormat")
@Inject("amParseFilter")
export class DateFormat {

    constructor(private amParseFilter: any) { }

    transform(date: string, options: any) {
        return this.amParseFilter(date, "YYYY/MM/DD HH:mm:ss").toISOString();
    }

}
