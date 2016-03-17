import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {provide} from 'ng-forward';

import {LanguageSelector} from './language-selector.component';

import * as helpers from "../../../spec/helpers";

describe("Components", () => {

    describe("Language Selector Component", () => {

        beforeEach(angular.mock.module("templates"));

        let translatorService: any;

        let buildComponent = (): Promise<ComponentFixture> => {
            translatorService = jasmine.createSpyObj("translatorService", ["availableLanguages", "currentLanguage"])
            return helpers.quickCreateComponent({
                template: "<language-selector></language-selector>",
                directives: [LanguageSelector],
                providers: [
                    provide('TranslatorService', {
                        useValue: translatorService
                    })
                ].concat(helpers.provideFilters("translateFilter"))
            });
        }

        it("display language options", (done) => {
            buildComponent().then(fixture => {
                fixture.debugElement.getLocal("$rootScope").$apply();
                expect(fixture.debugElement.queryAll('li.language').length).toEqual(2);
                done();
            });
        });

        it("call the translator service when change the language", (done) => {
            let translatorService = jasmine.createSpyObj("translatorService", ["changeLanguage"]);
            let languageSelector = new LanguageSelector(<any>translatorService);
            languageSelector.changeLanguage("en");
            expect(translatorService.changeLanguage).toHaveBeenCalledWith("en");
            done();
        });

    });
});
