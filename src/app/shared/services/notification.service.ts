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
        this.showMessage({ title: title, text: message, showConfirmButton: showConfirmButton, type: "error" });
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
        this.showMessage({ title: title, text: message, timer: timer });
    }

    private showMessage({title, text, type = "success", timer = null, showConfirmButton = true}) {
        this.$log.debug("Notification message:", title, text, type, this.translatorService.currentLanguage());
        this.SweetAlert.swal({
            title: this.translatorService.translate(title),
            text: this.translatorService.translate(text),
            type: type,
            timer: timer,
            showConfirmButton: showConfirmButton
        });
    }

}
