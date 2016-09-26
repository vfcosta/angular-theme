import { ComponentTestHelper, createClass } from "../../../spec/component-test-helper";
import { SearchFormComponent } from "./search-form.component";
import * as helpers from "../../../spec/helpers";

const htmlTemplate: string = '<search-form></search-form>';

describe("Components", () => {
    describe("Search Form Component", () => {

        let helper: ComponentTestHelper<SearchFormComponent>;
        let stateMock = jasmine.createSpyObj("$state", ["go", "params", "current"]);
        let eventsHubServiceMock = jasmine.createSpyObj("eventsHubServiceMock", ["subscribeToEvent"]);

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [SearchFormComponent],
                providers: [
                    helpers.createProviderToValue("$state", stateMock),
                    helpers.createProviderToValue("EventsHubService", eventsHubServiceMock),
                ]
            });
            helper = new ComponentTestHelper<SearchFormComponent>(cls, done);
        });

        it("render a button that open a search query field", () => {
            expect(helper.find(".btn-search-nav").length).toEqual(1);
        });

        it("go to search page when click on search button", () => {
            helper.component.query = 'query';
            helper.component.search();
            expect(stateMock.go).toHaveBeenCalledWith('main.environment.search', { query: 'query' });
        });

        it("subscribe to event on init", () => {
            expect(eventsHubServiceMock.subscribeToEvent).toHaveBeenCalled();
        });
    });
});
