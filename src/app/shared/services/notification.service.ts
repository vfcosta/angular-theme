import { ViewContainerRef, Injectable, Inject } from '@angular/core';
import { TranslatorService } from './translator.service';
import { SweetAlertType } from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NotificationType } from './notification-type';

@Injectable()
export class NotificationService {

    static get NotificationType() {
        return NotificationType;
    }
    public static DEFAULT_ERROR_TITLE = 'notification.error.default.title';
    public static DEFAULT_ERROR_MESSAGE = 'notification.error.default.message';
    public static DEFAULT_SUCCESS_TIMER = 5000;
    public static DEFAULT_INFO_TITLE = 'notification.info.default.title';
    public static DEFAULT_INFO_MESSAGE = 'notification.info.default.message';

    constructor(@Inject('sweetAlert') private sweetAlert: Function, private translatorService: TranslatorService,
        private toastr: ToastrService) { }


    error({
        message = NotificationService.DEFAULT_ERROR_MESSAGE,
        title = NotificationService.DEFAULT_ERROR_TITLE,
        notificationType = NotificationType.Toast
    } = {}, options = {}) {
        if (notificationType === NotificationType.Toast) {
            this.toastr.error(this.translatorService.translate(message), this.translatorService.translate(title), Object.assign(this.toastrOptions(), options));
        } else {
            this.showMessage(Object.assign({ title: title, text: message, showConfirmButton: true, type: "error" }, options));
        }

    }

    httpError(status: number, data: any): boolean {
        // FIXME check other https status and make a generic message
        // not-found, unauthorized, forbidden, server error
        if ([500].indexOf(status) > -1) {
            this.error({ message: `notification.http_error.${status}.message` });
            return true; // return true to indicate that the error was already handled
        } else {
            return false;
        }

    }

    success({
        title = 'toast.title.success',
        message = '',
        notificationType = NotificationType.Toast
    }, options = {}) {
        if (notificationType === NotificationType.Toast) {
            options = Object.assign({ timeOut: NotificationService.DEFAULT_SUCCESS_TIMER });
            this.toastr.success(this.translatorService.translate(message),
                this.translatorService.translate(title),
                Object.assign(this.toastrOptions(), options)
            );
        } else {
            this.showMessage(Object.assign({ title: title, text: message, timer: NotificationService.DEFAULT_SUCCESS_TIMER }, options));
        }

    }

    confirmation({ title = '', message = '', showCancelButton = true, type = "warning" }, confirmationFunction: Function) {
        this.showMessage({ title: title, text: message, showCancelButton: showCancelButton, type: type, closeOnConfirm: true, timer: null }, confirmationFunction);
    }

    info({
        message = NotificationService.DEFAULT_INFO_MESSAGE,
        title = NotificationService.DEFAULT_INFO_TITLE,
        notificationType = NotificationType.Toast
    } = {}, options = {}) {
        if (notificationType === NotificationType.Toast) {
            this.toastr.info(this.translatorService.translate(message), this.translatorService.translate(title), Object.assign(this.toastrOptions(), options));
        } else {
            this.showMessage(Object.assign({ title: title, text: message, showConfirmButton: true, type: "info" }, options));
        }

    }

    private showMessage({ title = '', text = '', type = "success", timer = NotificationService.DEFAULT_SUCCESS_TIMER, showConfirmButton = true, showCancelButton = false, closeOnConfirm = true }, confirmationFunction: Function = null) {
        this.sweetAlert({
            title: this.translatorService.translate(title),
            text: this.translatorService.translate(text),
            type: <SweetAlertType>type,
            timer: timer,
            showConfirmButton: showConfirmButton,
            showCancelButton: showCancelButton,
        }).then(
            (success) => { if (confirmationFunction) confirmationFunction(); },
            (dismiss) => {}
        );
    }

    private toastrOptions(options = {}) {
        return {
            allowHtml: false,
            closeButton: true,
            closeHtml: '<button>&times;</button>',
            extendedTimeOut: 1000,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            messageClass: 'toast-message',
            // onHidden: null,
            // onShown: null,
            // onTap: null,
            progressBar: false,
            tapToDismiss: true,
            templates: {
                toast: 'directives/toast/toast.html',
                progressbar: 'directives/progressbar/progressbar.html'
            },
            timeOut: 5000,
            titleClass: 'toast-title',
            toastClass: 'toast'
        };
    }



}
