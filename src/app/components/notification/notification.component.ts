import {Injectable, Inject} from "ng-forward";

@Injectable()
@Inject("$log", "SweetAlert")
export class Notification {

    constructor(private $log: ng.ILogService, private SweetAlert: any) { }

    public static DEFAULT_HTTP_ERROR_MESSAGE = "Something went wrong!";
    public static DEFAULT_SUCCESS_TIMER = 1000;

    httpError(status: number, data: any): boolean {
        this.$log.debug(status, data);

        let message = (data || {}).message || Notification.DEFAULT_HTTP_ERROR_MESSAGE;
        this.SweetAlert.swal({
            title: "Oops...",
            text: message,
            type: "error"
        });
        return true; // return true to indicate that the error was already handled
    }

    success(title: string, text: string, timer: number = Notification.DEFAULT_SUCCESS_TIMER) {
        this.SweetAlert.swal({
            title: title,
            text: text,
            type: "success",
            timer: timer
        });
    }

}
