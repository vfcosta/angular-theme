import {Injectable, Inject} from "ng-forward";
import {LanguageService} from "../language-selector/language.service";

@Injectable()
@Inject("$log", "SweetAlert", LanguageService)
export class Notification {

    constructor(
        private $log: ng.ILogService,
        private SweetAlert: any,
        private languageService: LanguageService
    ) { }

    public static DEFAULT_ERROR_TITLE = "notification.error.default.title";
    public static DEFAULT_ERROR_MESSAGE = "notification.error.default.message";
    public static DEFAULT_SUCCESS_TIMER = 1000;

    error(message: string = Notification.DEFAULT_ERROR_MESSAGE, title: string = Notification.DEFAULT_ERROR_TITLE) {
        this.$log.debug("Notification error:", title, message, this.languageService.currentLanguage());
        this.SweetAlert.swal({
            title: this.languageService.translate(title),
            text: this.languageService.translate(message),
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
