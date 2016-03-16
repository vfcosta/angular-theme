import {Injectable, Inject} from "ng-forward";
import {TranslatorService} from "../translator/translator.service";

@Injectable()
@Inject("$log", "SweetAlert", TranslatorService)
export class Notification {

    constructor(
        private $log: ng.ILogService,
        private SweetAlert: any,
        private translatorService: TranslatorService
    ) { }

    public static DEFAULT_ERROR_TITLE = "notification.error.default.title";
    public static DEFAULT_ERROR_MESSAGE = "notification.error.default.message";
    public static DEFAULT_SUCCESS_TIMER = 1000;

    error(message: string = Notification.DEFAULT_ERROR_MESSAGE, title: string = Notification.DEFAULT_ERROR_TITLE) {
        this.$log.debug("Notification error:", title, message, this.translatorService.currentLanguage());
        this.SweetAlert.swal({
            title: this.translatorService.translate(title),
            text: this.translatorService.translate(message),
            type: "error"
        });
    }

    httpError(status: number, data: any): boolean {
        this.error(`notification.http_error.${status}.message`);
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
