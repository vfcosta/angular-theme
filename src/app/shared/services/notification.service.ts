import {Injectable, Inject} from "ng-forward";
import {TranslatorService} from "./translator.service";

@Injectable()
@Inject("$log", "SweetAlert", TranslatorService)
export class NotificationService {

    constructor(
        private $log: ng.ILogService,
        private SweetAlert: any,
        private translatorService: TranslatorService
    ) { }

    public static DEFAULT_ERROR_TITLE = "notification.error.default.title";
    public static DEFAULT_ERROR_MESSAGE = "notification.error.default.message";
    public static DEFAULT_SUCCESS_TIMER = 1000;

    error({
        message = NotificationService.DEFAULT_ERROR_MESSAGE,
        title = NotificationService.DEFAULT_ERROR_TITLE,
        showConfirmButton = true
    } = {}) {
        this.$log.debug("Notification error:", title, message, this.translatorService.currentLanguage());
        this.SweetAlert.swal({
            title: this.translatorService.translate(title),
            text: this.translatorService.translate(message),
            type: "error",
            showConfirmButton: showConfirmButton
        });
    }

    httpError(status: number, data: any): boolean {
        this.error({ message: `notification.http_error.${status}.message` });
        return true; // return true to indicate that the error was already handled
    }

    success({
        title,
        message,
        timer = NotificationService.DEFAULT_SUCCESS_TIMER
    }) {
        this.SweetAlert.swal({
            title: title,
            text: message,
            type: "success",
            timer: timer
        });
    }

}
