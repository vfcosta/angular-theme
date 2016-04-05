import {Input, provide, Component} from 'ng-forward';
import {MacroDirective} from "./macro.directive";

import * as helpers from "../../../spec/helpers";

const htmlTemplate: string = '<div data-macro="macro_component" data-macro-custom="custom"></div>';

describe("Directives", () => {

    describe("Macro directive", () => {
        it("renders a macro component using the name passed in data-macro", (done: Function) => {
            helpers.quickCreateComponent({ template: htmlTemplate, directives: [MacroDirective] }).then((fixture) => {
                expect(fixture.debugElement.queryAll('macro-component').length).toEqual(1);
                done();
            });
        });

        it("extract custom attributes from macro", (done: Function) => {
            helpers.quickCreateComponent({ template: htmlTemplate, directives: [MacroDirective] }).then((fixture) => {
                expect(fixture.debugElement.query('macro-component').attr("custom")).toEqual("custom");
                done();
            });
        });
    });
});
