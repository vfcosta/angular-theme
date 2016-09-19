import {TestComponentBuilder, ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {Pipe, Input, provide, Component} from 'ng-forward';

import * as helpers from "../../../spec/helpers";

import {NotificationService} from "./notification.service";
// import {TranslatorService} from './translator.service';

// import {NotificationService} from "./translator.service";

const tcb = new TestComponentBuilder();

describe("Components", () => {

    describe("Profile Image Component", () => {

        let sweetAlert: any;
        let toastr: any;
        let translatorService: any;

        beforeEach(() => {
            sweetAlert = jasmine.createSpyObj("sweetAlert", ["swal"]);
            toastr = jasmine.createSpyObj("toastr", ["error", "success"]);
            translatorService = jasmine.createSpyObj("translatorService", ["translate", "currentLanguage"]);
        });

        function createComponent() {
            return new NotificationService(
                <any>helpers.mocks.$log,
                <any>sweetAlert,
                <any>helpers.mocks.translatorService,
                <any>toastr
            );
        }

        it("display an error message when notify an error", done => {
            let component: NotificationService = createComponent();

            component.error({ message: "message", title: "title" });
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                title: "title",
                text: "message",
                type: "error"
            }), null);
            done();
        });

        it("use the default message when call notification component without a message", done => {
            let component: NotificationService = createComponent();
            component.error();
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                text: NotificationService.DEFAULT_ERROR_MESSAGE,
                type: "error"
            }), null);
            done();
        });

        it("use the default title when call notification component without a title", done => {
            let component: NotificationService = createComponent();
            component.error();
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                title: NotificationService.DEFAULT_ERROR_TITLE,
                type: "error"
            }), null);
            done();
        });

        it("display an toast error message when notify an error", done => {
            let component: NotificationService = createComponent();
            component.error({ message: "some message", title: "some title", notificationType: NotificationService.NotificationType.Toast });
            expect(toastr.error).toHaveBeenCalledWith("some message", "some title", jasmine.any(Object));
            done();
        });

        it("use the default message when call notification toast component without a message", done => {
            let component: NotificationService = createComponent();
            component.error({ notificationType: NotificationService.NotificationType.Toast });
            expect(toastr.error).toHaveBeenCalledWith(NotificationService.DEFAULT_ERROR_MESSAGE, jasmine.any(String), jasmine.any(Object));
            done();
        });

        it("use the default message when call notification toast component without a message", done => {
            let component: NotificationService = createComponent();
            component.error({ notificationType: NotificationService.NotificationType.Toast });
            expect(toastr.error).toHaveBeenCalledWith(jasmine.any(String), NotificationService.DEFAULT_ERROR_TITLE, jasmine.any(Object));
            done();
        });

        it("display a success message when call notification success", done => {
            let component: NotificationService = createComponent();
            component.success({ title: "title", message: "message" });
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                type: "success"
            }), null);
            done();
        });

        it("display a toast success message when call notification success", done => {
            let component: NotificationService = createComponent();
            component.success({ title: "some title", message: "some message", notificationType: NotificationService.NotificationType.Toast });
            expect(toastr.success).toHaveBeenCalledWith("some message", "some title", jasmine.any(Object));
            done();
        });

        it("translate toast success message when call notification success", done => {
            let component: NotificationService = new NotificationService(<any>helpers.mocks.$log, <any>sweetAlert, <any>translatorService, <any>toastr);
            component.success({ title: "some title", message: "some message", notificationType: NotificationService.NotificationType.Toast });
            expect(translatorService.translate).toHaveBeenCalledWith("some message");
            done();
        });

        it("translate toast success title when call notification success", done => {
            let component: NotificationService = new NotificationService(<any>helpers.mocks.$log, <any>sweetAlert, <any>translatorService, <any>toastr);
            component.success({ title: "some title", message: "some message", notificationType: NotificationService.NotificationType.Toast });
            expect(translatorService.translate).toHaveBeenCalledWith("some title");
            done();
        });

        it("display a message relative to the http error code", done => {
            let component: NotificationService = createComponent();
            component.httpError(500, {});
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                text: "notification.http_error.500.message"
            }), null);
            done();
        });

        it("set the default timer in success messages", done => {
            let component: NotificationService = createComponent();
            component.success({ title: "title", message: "message" });
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                type: "success",
                timer: NotificationService.DEFAULT_SUCCESS_TIMER
            }), null);
            done();
        });

        it("display a confirmation dialog when call confirmation method", done => {
            let component: NotificationService = createComponent();
            let func = () => { };
            component.confirmation({ title: "title", message: "message" }, func);
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                title: "title",
                text: "message",
                type: "warning"
            }), jasmine.any(Function));
            done();
        });
    });
});
