import {ComponentTestHelper, createClass} from "../../../spec/component-test-helper";
import {SearchFormComponent} from "./search-form.component";
import * as helpers from "../../../spec/helpers";

const htmlTemplate: string = '<search-form></search-form>';

describe("Components", () => {
    describe("Search Form Component", () => {

        let helper: ComponentTestHelper<SearchFormComponent>;
        let stateMock = jasmine.createSpyObj("$state", ["go", "params", "current"]);

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [SearchFormComponent],
                providers: [helpers.createProviderToValue("$state", stateMock)]
            });
            helper = new ComponentTestHelper<SearchFormComponent>(cls, done);
        });

        it("render a input for search query", () => {
            expect(helper.find(".search-input").length).toEqual(1);
        });

        it("go to search page when click on search button", () => {
            helper.component.query = 'query';
            helper.component.search();
            expect(stateMock.go).toHaveBeenCalledWith('main.environment.search', { query: 'query' });
        });
    });
});