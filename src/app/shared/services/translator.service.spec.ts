import {TranslatorService} from './translator.service';
import * as helpers from '../../../spec/helpers';

describe("Services", () => {
    describe("Translator Service", () => {
        const mocks = helpers.getMocks();

        function createComponent() {
            return new TranslatorService(<any>mocks.translateService, <any>mocks.localStorageService);
        }

        it("change the language", () => {
            const component: TranslatorService = createComponent();
            component["localStorageService"].store = jasmine.createSpy("store");
            component["localStorageService"].retrieve = jasmine.createSpy("retrieve").and.returnValue("en");
            component["translateService"].use = jasmine.createSpy("use");

            component.changeLanguage('pt');

            expect(component["localStorageService"].store).toHaveBeenCalledWith("language", "pt");
            expect(component["translateService"].use).toHaveBeenCalledWith("pt");
        });

        it("do nothing when call change language with null", () => {
            const component: TranslatorService = createComponent();
            component["localStorageService"].store = jasmine.createSpy("sstoreet");
            component["translateService"].use = jasmine.createSpy("use");

            component.changeLanguage(null);

            expect(component["localStorageService"].store).not.toHaveBeenCalled();
            expect(component["translateService"].use).not.toHaveBeenCalled();
        });

        it("call translate service when translate a text", () => {
            const component: TranslatorService = createComponent();
            component["translateService"].instant = jasmine.createSpy("instant");
            component.translate("text");
            expect(component["translateService"].instant).toHaveBeenCalledWith("text", undefined);
        });
    });
});
