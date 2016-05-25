import {provide} from 'ng-forward';
import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';
import {StatisticsBlockComponent} from './statistics-block.component';
import * as helpers from "../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-statistics-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-statistics-block>';


describe("Components", () => {

    describe("Statistics Block Component", () => {
        let helper: ComponentTestHelper<StatisticsBlockComponent>;
        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let articleService: any = helpers.mocks.articleService;
            let blockService: any = jasmine.createSpyObj("blockService", ["getBlock"]);
            let cls = createClass({
                template: htmlTemplate,
                directives: [StatisticsBlockComponent],
                providers: [
                   provide('ArticleService', { useValue: articleService }),
                   provide('BlockService', { useValue: blockService })
                ].concat(helpers.provideFilters("translateFilter")),
                properties: {
                    block: {
                        statistics: [
                            {
                                name: "users",
                                display: true,
                                quantity: 10
                            },
                            {
                                name: "communities",
                                display: true,
                                quantity: 20
                            },
                            {
                                name: "hits",
                                display: false,
                                quantity: null
                            }
                        ]
                    }
                }
            });
            helper = new ComponentTestHelper<StatisticsBlockComponent>(cls, done);
        });

        it("shows statistics marked with display equals 'true'", () => {
            expect(helper.debugElement.queryAll("li.statistic").length).toEqual(2);
            expect(helper.debugElement.query("span.users").text()).toEqual("10");
            expect(helper.debugElement.query("span.communities").text()).toEqual("20");
        });

        it("does not shows statistics marked with display equals 'false'", () => {
            expect(helper.debugElement.queryAll("span.hits").length).toEqual(0);
        });
    });
});
