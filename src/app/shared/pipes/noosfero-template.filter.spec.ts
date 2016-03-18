import {quickCreateComponent} from "../../../spec/helpers";
import {NoosferoTemplate} from './noosfero-template.filter';

describe("Filters", () => {
    describe("Noosfero Template Filter", () => {

        beforeEach(angular.mock.module("templates"));

        it("replace the options in text with the values passed on options", done => {
            let text = 'profile: {profile}, other: {other}';
            let htmlTemplate = `{{ '${text}' | noosferoTemplate: {profile: 'profile1', other: 'other value'} }}`;
            quickCreateComponent({ providers: [NoosferoTemplate], template: htmlTemplate }).then(fixture => {
                expect(fixture.debugElement.text()).toEqual("profile: profile1, other: other value");
                done();
            });
        });

    });
});
