import { fakeAsync, tick } from '@angular/core/testing';
import * as helpers from '../../../spec/helpers';
import { NotificationService } from './notification.service';

describe("Components", () => {
    describe("Profile Image Component", () => {

        let sweetAlert: any;
        let toastr: any;
        let translatorService: any;
        const mocks = helpers.getMocks();

        beforeEach(() => {
            sweetAlert = jasmine.createSpy("sweetAlert").and.returnValue(Promise.resolve());
            toastr = jasmine.createSpyObj("toastr", ["error", "success", "info"]);
            translatorService = jasmine.createSpyObj("translatorService", ["translate", "currentLanguage"]);
        });

        function createComponent() {
            return new NotificationService(<any>sweetAlert, <any>mocks.translatorService, <any>toastr);
        }

        it("display a sweet error message when notify an error with SweetAlert", () => {
            let component: NotificationService = createComponent();
            component.error({ message: "message", title: "title", notificationType: NotificationService.NotificationType.SweetAlert });
            expect(sweetAlert).toHaveBeenCalledWith(jasmine.objectContaining({
                title: "title",
                text: "message",
                type: "error"
            }));
        });

        it("use the default message when call error notification component without a message", () => {
            let component: NotificationService = createComponent();
            component.error({ notificationType: NotificationService.NotificationType.SweetAlert });
            expect(sweetAlert).toHaveBeenCalledWith(jasmine.objectContaining({
                text: NotificationService.DEFAULT_ERROR_MESSAGE,
                type: "error"
            }));
        });

        it("use the default title when call error notification component without a title", () => {
            let component: NotificationService = createComponent();
            component.error({ notificationType: NotificationService.NotificationType.SweetAlert });
            expect(sweetAlert).toHaveBeenCalledWith(jasmine.objectContaining({
                title: NotificationService.DEFAULT_ERROR_TITLE,
                type: "error"
            }));
        });

        it("use toast by default in error message", () => {
            let component: NotificationService = createComponent();
            component.error({ message: "some message", title: "some title" });
            expect(toastr.error).toHaveBeenCalledWith("some message", "some title", jasmine.any(Object));
        });

        it("use toast by default in success message", () => {
            let component: NotificationService = createComponent();
            component.success({ message: "some message", title: "some title" });
            expect(toastr.success).toHaveBeenCalledWith("some message", "some title", jasmine.any(Object));
        });

        it("use toast by default in info message", () => {
            let component: NotificationService = createComponent();
            component.info({ message: "some message", title: "some title" });
            expect(toastr.info).toHaveBeenCalledWith("some message", "some title", jasmine.any(Object));
        });

        it("display an toast error message when notify an error", () => {
            let component: NotificationService = createComponent();
            component.error({ message: "some message", title: "some title", notificationType: NotificationService.NotificationType.Toast });
            expect(toastr.error).toHaveBeenCalledWith("some message", "some title", jasmine.any(Object));
        });

        it("use the default message when call error notification toast component without a message", () => {
            let component: NotificationService = createComponent();
            component.error({ notificationType: NotificationService.NotificationType.Toast });
            expect(toastr.error).toHaveBeenCalledWith(NotificationService.DEFAULT_ERROR_MESSAGE, jasmine.any(String), jasmine.any(Object));
        });

        it("use the default message when call error notification toast component without a message", () => {
            let component: NotificationService = createComponent();
            component.error({ notificationType: NotificationService.NotificationType.Toast });
            expect(toastr.error).toHaveBeenCalledWith(jasmine.any(String), NotificationService.DEFAULT_ERROR_TITLE, jasmine.any(Object));
        });

        it("display a success message when call notification success", () => {
            let component: NotificationService = createComponent();
            component.success({ title: "title", message: "message", notificationType: NotificationService.NotificationType.SweetAlert });
            expect(sweetAlert).toHaveBeenCalledWith(jasmine.objectContaining({
                type: "success"
            }));
        });

        it("display a toast success message when call notification success", () => {
            let component: NotificationService = createComponent();
            component.success({ title: "some title", message: "some message", notificationType: NotificationService.NotificationType.Toast });
            expect(toastr.success).toHaveBeenCalledWith("some message", "some title", jasmine.any(Object));
        });

        it("translate toast success message when call notification success", () => {
            let component: NotificationService = new NotificationService(<any>sweetAlert, <any>translatorService, <any>toastr);
            component.success({ title: "some title", message: "some message", notificationType: NotificationService.NotificationType.Toast });
            expect(translatorService.translate).toHaveBeenCalledWith("some message");
        });

        it("translate toast success title when call notification success", () => {
            let component: NotificationService = new NotificationService(<any>sweetAlert, <any>translatorService, <any>toastr);
            component.success({ title: "some title", message: "some message", notificationType: NotificationService.NotificationType.Toast });
            expect(translatorService.translate).toHaveBeenCalledWith("some title");
        });

        it("display a message relative to the http error code", () => {
            let component: NotificationService = createComponent();
            component.httpError(500, {});
            expect(toastr.error).toHaveBeenCalledWith("notification.http_error.500.message", NotificationService.DEFAULT_ERROR_TITLE, jasmine.any(Object));
        });

        it("set the default timer in success messages", () => {
            let component: NotificationService = createComponent();
            component.success({ title: "title", message: "message", notificationType: NotificationService.NotificationType.SweetAlert });
            expect(sweetAlert).toHaveBeenCalledWith(jasmine.objectContaining({
                type: "success",
                timer: NotificationService.DEFAULT_SUCCESS_TIMER
            }));
        });

        it("display a confirmation dialog when call confirmation method", fakeAsync(() => {
            let component: NotificationService = createComponent();
            let func = jasmine.createSpy('confirmationFunction');
            component.confirmation({ title: "title", message: "message" }, func);
            expect(sweetAlert).toHaveBeenCalledWith(jasmine.objectContaining({
                title: "title",
                text: "message",
                type: "warning"
            }));
            tick();
            expect(func).toHaveBeenCalled();
        }));

        it("display an info message when notify an info", () => {
            let component: NotificationService = createComponent();

            component.info({ message: "message", title: "title", notificationType: NotificationService.NotificationType.SweetAlert });
            expect(sweetAlert).toHaveBeenCalledWith(jasmine.objectContaining({
                title: "title",
                text: "message",
                type: "info"
            }));
        });

        it("use the default message when call info notification component without a message", () => {
            let component: NotificationService = createComponent();
            component.info({ notificationType: NotificationService.NotificationType.SweetAlert });
            expect(sweetAlert).toHaveBeenCalledWith(jasmine.objectContaining({
                text: NotificationService.DEFAULT_INFO_MESSAGE,
                type: "info"
            }));
        });

        it("use the default title when call info notification component without a title", () => {
            let component: NotificationService = createComponent();
            component.info({ notificationType: NotificationService.NotificationType.SweetAlert });
            expect(sweetAlert).toHaveBeenCalledWith(jasmine.objectContaining({
                title: NotificationService.DEFAULT_INFO_TITLE,
                type: "info"
            }));
        });

        it("display an toast info message when notify an info", () => {
            let component: NotificationService = createComponent();
            component.info({ message: "some message", title: "some title", notificationType: NotificationService.NotificationType.Toast });
            expect(toastr.info).toHaveBeenCalledWith("some message", "some title", jasmine.any(Object));
        });

        it("use the default message when call info notification toast component without a message", () => {
            let component: NotificationService = createComponent();
            component.info({ notificationType: NotificationService.NotificationType.Toast });
            expect(toastr.info).toHaveBeenCalledWith(NotificationService.DEFAULT_INFO_MESSAGE, jasmine.any(String), jasmine.any(Object));
        });

        it("use the default message when call info notification toast component without a message", () => {
            let component: NotificationService = createComponent();
            component.info({ notificationType: NotificationService.NotificationType.Toast });
            expect(toastr.info).toHaveBeenCalledWith(jasmine.any(String), NotificationService.DEFAULT_INFO_TITLE, jasmine.any(Object));
        });
    });
});
