import {Pipe, Inject} from "ng-forward";

@Pipe("dateFormat")
export class DateFormat {

    transform(date: string, options: any) {
        return moment(date, "YYYY/MM/DD HH:mm:ss");
    }

}
