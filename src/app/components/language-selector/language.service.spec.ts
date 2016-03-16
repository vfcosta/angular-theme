import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {provide} from 'ng-forward';

import {LanguageService} from './language.service';

import * as helpers from "../../../spec/helpers";

describe("Services", () => {

    describe("Language Service", () => {

        let $rootScope: ng.IScope;
        let $q: ng.IQService;

        beforeEach(inject((_$rootScope_: ng.IRootScopeService, _$q_: ng.IQService) => {
            $rootScope = _$rootScope_;
            $q = _$q_;
        }));

        it("set available languages when change language", (done) => {
            let component: LanguageService = new LanguageService(
                <any>helpers.mocks.$translate,
                <any>helpers.mocks.tmhDynamicLocale,
                <any>helpers.mocks.amMoment,
                <any>helpers.mocks.angularLoad,
                helpers.mocks.scopeWithEvents
            );
            component.availableLanguages = null;
            expect(component.availableLanguages).toBeNull();
            component.changeLanguage('en');
            expect(component.availableLanguages).toBeDefined();
            done();
        });

        it("change the language", (done) => {
            let component: LanguageService = new LanguageService(
                <any>helpers.mocks.$translate,
                <any>helpers.mocks.tmhDynamicLocale,
                <any>helpers.mocks.amMoment,
                <any>helpers.mocks.angularLoad,
                helpers.mocks.scopeWithEvents
            );
            let loadScripPromise = $q.defer();
            loadScripPromise.resolve();
            component["angularLoad"].loadScript = jasmine.createSpy("loadScript").and.returnValue(loadScripPromise.promise);
            component["tmhDynamicLocale"].set = jasmine.createSpy("set");
            component["tmhDynamicLocale"].get = jasmine.createSpy("get").and.returnValue("en");
            component["$translate"].use = jasmine.createSpy("use");

            component.changeLanguage('pt');
            $rootScope.$digest();

            expect(component["angularLoad"].loadScript).toHaveBeenCalledWith("/bower_components/moment/locale/pt.js");
            expect(component["angularLoad"].loadScript).toHaveBeenCalledWith("/bower_components/messageformat/locale/pt.js");
            expect(component["tmhDynamicLocale"].set).toHaveBeenCalledWith("pt");
            expect(component["$translate"].use).toHaveBeenCalledWith("pt");
            done();
        });

    });
});
