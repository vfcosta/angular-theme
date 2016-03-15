import {TestComponentBuilder, ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {Pipe, Input, provide, Component} from 'ng-forward';

import * as helpers from "../../../spec/helpers";

import {Notification} from "./notification.component";

const tcb = new TestComponentBuilder();

describe("Components", () => {

    describe("Profile Image Component", () => {

        beforeEach(angular.mock.module("templates"));

        it("use the default message when call notification component without a specific message", done => {
            let sweetAlert = jasmine.createSpyObj("sweetAlert", ["swal"]);
            sweetAlert.swal = jasmine.createSpy("swal");

            let component: Notification = new Notification(<any>helpers.mocks.$log, <any>sweetAlert, <any>helpers.mocks.$translate);
            component.httpError(500, {});
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                text: Notification.DEFAULT_ERROR_MESSAGE,
                type: "error"
            }));
            done();
        });

        it("use the default message when call notification component without error data", done => {
            let sweetAlert = jasmine.createSpyObj("sweetAlert", ["swal"]);
            sweetAlert.swal = jasmine.createSpy("swal");

            let component: Notification = new Notification(<any>helpers.mocks.$log, <any>sweetAlert, <any>helpers.mocks.$translate);
            component.httpError(500, null);
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                text: Notification.DEFAULT_ERROR_MESSAGE,
                type: "error"
            }));
            done();
        });

        it("display a success message when call notification success", done => {
            let sweetAlert = jasmine.createSpyObj("sweetAlert", ["swal"]);
            sweetAlert.swal = jasmine.createSpy("swal");

            let component: Notification = new Notification(<any>helpers.mocks.$log, <any>sweetAlert, <any>helpers.mocks.$translate);
            component.success("title", "message", 1000);
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                type: "success"
            }));
            done();
        });

        it("set the default timer in success messages", done => {
            let sweetAlert = jasmine.createSpyObj("sweetAlert", ["swal"]);
            sweetAlert.swal = jasmine.createSpy("swal");

            let component: Notification = new Notification(<any>helpers.mocks.$log, <any>sweetAlert, <any>helpers.mocks.$translate);
            component.success("title", "message");
            expect(sweetAlert.swal).toHaveBeenCalledWith(jasmine.objectContaining({
                type: "success",
                timer: Notification.DEFAULT_SUCCESS_TIMER
            }));
            done();
        });
    });
});
