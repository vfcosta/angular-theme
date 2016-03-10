import {quickCreateComponent} from "../../../../spec/helpers";
import {DateFormat} from './date-format.filter';

describe("Filters", () => {
    describe("Date Format Filter", () => {

        beforeEach(angular.mock.module("templates"));

        it("convert date from the format returned by noosfero api to an ISO format", done => {
            let date = "2016/03/10 10:46:47";
            let htmlTemplate = `{{ '${date}' | dateFormat }}`;
            quickCreateComponent({ providers: [DateFormat], template: htmlTemplate }).then(fixture => {
                expect(fixture.debugElement.text()).toEqual('"2016-03-10T13:46:47.000Z"');
                done();
            });
        });

    });
});
