import {quickCreateComponent} from "../../../spec/helpers";
import {DateFormat} from './date-format.filter';

describe("Filters", () => {
    describe("Date Format Filter", () => {

        beforeEach(angular.mock.module("templates"));
        beforeEach(angular.mock.module("angularMoment"));

        it("convert date from the format returned by noosfero api to an ISO format", done => {
            let dateString = '2016/03/10 10:46:47';
            let date = new Date(dateString);
            let htmlTemplate = `{{ '${dateString}' | dateFormat }}`;
            quickCreateComponent({ providers: [DateFormat], template: htmlTemplate }).then(fixture => {
                expect(fixture.debugElement.text()).toEqual(date.toISOString());
                done();
            });
        });

    });
});
