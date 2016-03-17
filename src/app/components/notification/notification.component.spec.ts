import {TestComponentBuilder, ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {Pipe, Input, provide, Component} from 'ng-forward';

import * as helpers from "../../../spec/helpers";

import {Notification} from "./notification.component";

const tcb = new TestComponentBuilder();

describe("Components", () => {

    describe("Profile Image Component", () => {

        beforeEach(angular.mock.module("templates"));

        it("display an error message when notify an error", done => {
            let sweetAlert = jasmine.createSpyObj("sweetAlert", ["swal"]);
            sweetAlert.swal = jasmine.createSpy("swal");

            let component: Notification = new Notification(<any>helpers.mocks.$log, <any>sweetAlert, <any>helpers.mocks.translatorService);
            component.error("message", "title");
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                text: "message",
                title: "title",
                type: "error"
            }));
            done();
        });

        it("use the default message when call notification component without a message", done => {
            let sweetAlert = jasmine.createSpyObj("sweetAlert", ["swal"]);
            sweetAlert.swal = jasmine.createSpy("swal");

            let component: Notification = new Notification(<any>helpers.mocks.$log, <any>sweetAlert, <any>helpers.mocks.translatorService);
            component.error();
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                text: Notification.DEFAULT_ERROR_MESSAGE,
                type: "error"
            }));
            done();
        });

        it("display a success message when call notification success", done => {
            let sweetAlert = jasmine.createSpyObj("sweetAlert", ["swal"]);
            sweetAlert.swal = jasmine.createSpy("swal");

            let component: Notification = new Notification(<any>helpers.mocks.$log, <any>sweetAlert, <any>helpers.mocks.translatorService);
            component.success("title", "message", 1000);
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                type: "success"
            }));
            done();
        });

        it("display a message relative to the http error code", done => {
            let sweetAlert = jasmine.createSpyObj("sweetAlert", ["swal"]);
            sweetAlert.swal = jasmine.createSpy("swal");

            let component: Notification = new Notification(<any>helpers.mocks.$log, <any>sweetAlert, <any>helpers.mocks.translatorService);
            component.httpError(500, {});
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                text: "notification.http_error.500.message"
            }));
            done();
        });

        it("set the default timer in success messages", done => {
            let sweetAlert = jasmine.createSpyObj("sweetAlert", ["swal"]);
            sweetAlert.swal = jasmine.createSpy("swal");

            let component: Notification = new Notification(<any>helpers.mocks.$log, <any>sweetAlert, <any>helpers.mocks.translatorService);
            component.success("title", "message");
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                type: "success",
                timer: Notification.DEFAULT_SUCCESS_TIMER
            }));
            done();
        });
    });
});
