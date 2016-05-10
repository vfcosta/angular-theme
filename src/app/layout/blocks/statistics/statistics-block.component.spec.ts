import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';
import {StatisticsBlockComponent} from './statistics-block.component';
import * as helpers from "../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-statistics-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-statistics-block>';

describe("Components", () => {

    describe("Statistics Block Component", () => {
        let helper: ComponentTestHelper<StatisticsBlockComponent>;
        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [StatisticsBlockComponent],
                providers: helpers.provideFilters("translateFilter"),
                properties: {
                    block: {
                        user_counter: 1, users: 10, enterprise_counter: 1, enterprises: 20,
                        product_counter: 1, products: 30, community_counter: 1, communities: 40,
                        category_counter: 1, categories: 50, tag_counter: 1, tags: 60,
                        comment_counter: 1, comments: 70, hit_counter: 1, hits: 80
                    }
                }
                // this.counters.push({ 'should_display': this.block.enterprise_counter, 'value': this.block.enterprises, 'name': 'enterprises' })
                // this.counters.push({ 'should_display': this.block.product_counter, 'value': this.block.products, 'name': 'products' })
                // this.counters.push({ 'should_display': this.block.community_counter, 'value': this.block.communities, 'name': 'communities' })
                // this.counters.push({ 'should_display': this.block.category_counter, 'value': this.block.categories, 'name': 'categories' })
                // this.counters.push({ 'should_display': this.block.tag_counter, 'value': this.block.tags, 'name': 'tags' })
                // this.counters.push({ 'should_display': this.block.comment_counter, 'value': this.block.comments, 'name': 'comments' })
                // this.counters.push({ 'should_display': this.block.hit_counter, 'value': this.block.hits, 'name': 'hits' })
            });
            helper = new ComponentTestHelper<StatisticsBlockComponent>(cls, done);
        });

        it("get user counter information in array", () => {
            helper.component.counters.forEach((obj: any) => { delete obj.$$hashKey; });
            expect(helper.component.counters).toContain({ 'should_display': 1, 'value': 10, 'name': 'users' });
        });

        it("get user enterprise information in array", () => {
            helper.component.counters.forEach((obj: any) => { delete obj.$$hashKey; });
            expect(helper.component.counters).toContain({ 'should_display': 1, 'value': 20, 'name': 'enterprises' });
        });

        it("get product counter information in array", () => {
            helper.component.counters.forEach((obj: any) => { delete obj.$$hashKey; });
            expect(helper.component.counters).toContain({ 'should_display': 1, 'value': 30, 'name': 'products' });
        });

        it("get community counter information in array", () => {
            helper.component.counters.forEach((obj: any) => { delete obj.$$hashKey; });
            expect(helper.component.counters).toContain({ 'should_display': 1, 'value': 40, 'name': 'communities' });
        });

        it("get category counter information in array", () => {
            helper.component.counters.forEach((obj: any) => { delete obj.$$hashKey; });
            expect(helper.component.counters).toContain({ 'should_display': 1, 'value': 50, 'name': 'categories' });
        });

        it("get tag counter information in array", () => {
            helper.component.counters.forEach((obj: any) => { delete obj.$$hashKey; });
            expect(helper.component.counters).toContain({ 'should_display': 1, 'value': 60, 'name': 'tags' });
        });

        it("get comment counter information in array", () => {
            helper.component.counters.forEach((obj: any) => { delete obj.$$hashKey; });
            expect(helper.component.counters).toContain({ 'should_display': 1, 'value': 70, 'name': 'comments' });
        });

        it("get hit counter information in array", () => {
            helper.component.counters.forEach((obj: any) => { delete obj.$$hashKey; });
            expect(helper.component.counters).toContain({ 'should_display': 1, 'value': 80, 'name': 'hits' });
        });

        it("should render the user count information", () => {
            expect(helper.find('.list-group-item.users').length).toEqual(1, "The statistics-block should have a list item with users class");
        });

        it("should render the enterprise count information", () => {
            expect(helper.find('.list-group-item.enterprises').length).toEqual(1, "The statistics-block should have a list item with enterprises class");
        });

        it("should render the product count information", () => {
            expect(helper.find('.list-group-item.products').length).toEqual(1, "The statistics-block should have a list item with products class");
        });

        it("should render the community count information", () => {
            expect(helper.find('.list-group-item.communities').length).toEqual(1, "The statistics-block should have a list item with communities class");
        });

        it("should render the category count information", () => {
            expect(helper.find('.list-group-item.categories').length).toEqual(1, "The statistics-block should have a list item with categories class");
        });

        it("should render the tag count information", () => {
            expect(helper.find('.list-group-item.tags').length).toEqual(1, "The statistics-block should have a list item with tags class");
        });

        it("should render the comment count information", () => {
            expect(helper.find('.list-group-item.comments').length).toEqual(1, "The statistics-block should have a list item with comments class");
        });

        it("should render the hit count information", () => {
            expect(helper.find('.list-group-item.hits').length).toEqual(1, "The statistics-block should have a list item with hits class");
        });

        // it("should not render user count information if has no configuration on block", () => {
        //     helper.component.counters.forEach((obj: any) => { delete obj.$$hashKey; });
        //     expect(helper.component.counters).toContain({ 'should_display': 0, 'value': 0, 'name': 'users' });
        //     expect(helper.find('.list-group-item.users').length).toEqual(0, "The statistics-block should not have a list item with users class");
        // });

    });
});
