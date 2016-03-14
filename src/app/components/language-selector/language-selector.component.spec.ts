import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {provide} from 'ng-forward';

import {LanguageSelector} from './language-selector.component';

import * as helpers from "../../../spec/helpers";

describe("Components", () => {

    describe("Language Selector Component", () => {

        beforeEach(angular.mock.module("templates"));

        let buildComponent = (): Promise<ComponentFixture> => {
            return helpers.quickCreateComponent({
                template: "<language-selector></language-selector>",
                directives: [LanguageSelector],
                providers: [
                    provide('$translate', {
                        useValue: helpers.mocks.$translate
                    }),
                    provide('tmhDynamicLocale', {
                        useValue: helpers.mocks.tmhDynamicLocale
                    }),
                    provide('amMoment', {
                        useValue: helpers.mocks.amMoment
                    }),
                    provide('angularLoad', {
                        useValue: helpers.mocks.angularLoad
                    })
                ].concat(helpers.provideFilters("translateFilter"))
            });
        }

        it("set available languages when change language", (done) => {
            let component: LanguageSelector = new LanguageSelector(
                <any>helpers.mocks.$translate,
                <any>helpers.mocks.tmhDynamicLocale,
                <any>helpers.mocks.amMoment,
                <any>helpers.mocks.angularLoad
            );
            component.availableLanguages = null;
            expect(component.availableLanguages).toBeNull();
            component.changeLanguage('en');
            expect(component.availableLanguages).toBeDefined();
            done();
        });

        it("display language options", (done) => {
            buildComponent().then(fixture => {
                expect(fixture.debugElement.queryAll('li.language').length).toEqual(2);
                done();
            });
        });

        it("change the language", (done) => {
            buildComponent().then(fixture => {
                let component: LanguageSelector = fixture.debugElement.componentViewChildren[0].componentInstance;
                let $q = fixture.debugElement.getLocal("$q");
                let loadScripPromise = $q.defer();
                loadScripPromise.resolve();
                component["angularLoad"].loadScript = jasmine.createSpy("loadScript").and.returnValue(loadScripPromise.promise);
                component["tmhDynamicLocale"].set = jasmine.createSpy("set");
                component["tmhDynamicLocale"].get = jasmine.createSpy("get").and.returnValue("en");
                component["$translate"].use = jasmine.createSpy("use");

                component.changeLanguage('pt');
                fixture.debugElement.getLocal("$rootScope").$digest();

                expect(component["angularLoad"].loadScript).toHaveBeenCalledWith("/bower_components/moment/locale/pt.js");
                expect(component["angularLoad"].loadScript).toHaveBeenCalledWith("/bower_components/messageformat/locale/pt.js");
                expect(component["tmhDynamicLocale"].set).toHaveBeenCalledWith("pt");
                expect(component["$translate"].use).toHaveBeenCalledWith("pt");
                done();
            });
        });

    });
});
