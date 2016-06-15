import {ComponentTestHelper, createClass} from "../../spec/component-test-helper";
import {SearchComponent} from "./search.component";
import * as helpers from "../../spec/helpers";

const htmlTemplate: string = '<search></search>';

describe("Components", () => {
    describe("Search Component", () => {

        let helper: ComponentTestHelper<SearchComponent>;
        let stateParams = { query: 'query' };
        let articleService = jasmine.createSpyObj("ArticleService", ["search"]);
        let result = Promise.resolve({ data: [{ id: 1 }], headers: (param: string) => { return 1; } });
        articleService.search = jasmine.createSpy("search").and.returnValue(result);
        let stateMock = jasmine.createSpyObj("$state", ["go"]);

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [SearchComponent],
                providers: [
                    helpers.createProviderToValue("$stateParams", stateParams),
                    helpers.createProviderToValue("ArticleService", articleService),
                    helpers.createProviderToValue("$state", stateMock),
                ].concat(helpers.provideFilters("truncateFilter", "stripTagsFilter"))
            });
            helper = new ComponentTestHelper<SearchComponent>(cls, done);
        });

        it("load first page with search results", () => {
            expect(articleService.search).toHaveBeenCalledWith({ query: 'query', per_page: 10, page: 0 });
        });

        it("display search results", () => {
            expect(helper.all(".result").length).toEqual(1);
        });
    });
});
