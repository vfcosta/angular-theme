import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {provide} from 'ng-forward';

import {TranslatorService} from './translator.service';

import * as helpers from "../../../spec/helpers";

describe("Services", () => {

    describe("Translator Service", () => {

        let $rootScope: ng.IScope;
        let $q: ng.IQService;

        beforeEach(inject((_$rootScope_: ng.IRootScopeService, _$q_: ng.IQService) => {
            $rootScope = _$rootScope_;
            $q = _$q_;
        }));

        function createComponent() {
            return new TranslatorService(
                <any>helpers.mocks.$translate,
                <any>helpers.mocks.tmhDynamicLocale,
                <any>helpers.mocks.amMoment,
                <any>helpers.mocks.angularLoad,
                $rootScope
            );
        }

        it("change the language", (done) => {
            let component: TranslatorService = createComponent();
            let loadScripPromise = $q.defer();
            loadScripPromise.resolve();
            component["angularLoad"].loadScript = jasmine.createSpy("loadScript").and.returnValue(loadScripPromise.promise);
            component["tmhDynamicLocale"].set = jasmine.createSpy("set");
            component["tmhDynamicLocale"].get = jasmine.createSpy("get").and.returnValue("en");
            component["$translate"].use = jasmine.createSpy("use");

            component.changeLanguage('pt');
            $rootScope.$digest();

            expect(component["angularLoad"].loadScript).toHaveBeenCalledWith("/bower_components/moment/locale/pt.js");
            expect(component["tmhDynamicLocale"].set).toHaveBeenCalledWith("pt");
            expect(component["$translate"].use).toHaveBeenCalledWith("pt");
            done();
        });

        it("do not load moment locale when change the language to english", (done) => {
            let component: TranslatorService = createComponent();
            component["angularLoad"].loadScript = jasmine.createSpy("loadScript").and.returnValue($q.defer().promise);
            component.changeLanguage('en');
            expect(component["angularLoad"].loadScript).not.toHaveBeenCalledWith("/bower_components/moment/locale/pt.js");
            done();
        });

        it("do nothing when call change language with null", (done) => {
            let component: TranslatorService = createComponent();
            component["angularLoad"].loadScript = jasmine.createSpy("loadScript");
            component["tmhDynamicLocale"].set = jasmine.createSpy("set");
            component["$translate"].use = jasmine.createSpy("use");

            component.changeLanguage(null);

            expect(component["angularLoad"].loadScript).not.toHaveBeenCalled();
            expect(component["tmhDynamicLocale"].set).not.toHaveBeenCalled();
            expect(component["$translate"].use).not.toHaveBeenCalled();
            done();
        });

        it("return the current language used by the translator", (done) => {
            let component: TranslatorService = createComponent();
            component["$translate"].use = jasmine.createSpy("use").and.returnValue("en");
            expect(component.currentLanguage()).toEqual("en");
            expect(component["$translate"].use).toHaveBeenCalled();
            done();
        });

        it("call translate service when translate a text", (done) => {
            let component: TranslatorService = createComponent();
            component["$translate"].instant = jasmine.createSpy("instant");
            component.translate("text");
            expect(component["$translate"].instant).toHaveBeenCalledWith("text", undefined, undefined);
            done();
        });

        it("change the language when receive an event", (done) => {
            let component: TranslatorService = createComponent();
            component.changeLanguage = jasmine.createSpy("changeLanguage");
            $rootScope.$emit("$localeChangeSuccess");
            expect(component.changeLanguage).toHaveBeenCalled();
            done();
        });

        it("use the translate language when receive a change language event and there is no language previously selected", (done) => {
            let component: TranslatorService = createComponent();
            component.changeLanguage = jasmine.createSpy("changeLanguage");
            component["tmhDynamicLocale"].get = jasmine.createSpy("get").and.returnValue(null);
            component["$translate"].use = jasmine.createSpy("use").and.returnValue("en");

            $rootScope.$emit("$localeChangeSuccess");
            expect(component["$translate"].use).toHaveBeenCalled();
            expect(component.changeLanguage).toHaveBeenCalledWith("en");
            done();
        });
    });
});
