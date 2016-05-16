import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, provide} from 'ng-forward';
import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';
import {providers} from 'ng-forward/cjs/testing/providers';
import {DisplayContentBlockComponent} from './display-content-block.component';
import * as helpers from './../../../../spec/helpers';

const htmlTemplate: string = '<noosfero-display-content-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-display-content-block>';

describe("Components", () => {

    describe("Display Content Block Component", () => {
        let state = jasmine.createSpyObj("state", ["go"]);
        let providers = [
            provide('ArticleService', {
                useValue: helpers.mocks.articleService
            }),
            provide('$state', { useValue: state })
        ].concat(helpers.provideFilters("translateFilter"));

        let sections: noosfero.Section[] = [
            { value: 'abstract', checked: 'abstract'},
            { value: 'title', checked: 'title' }
        ];
        let settings: noosfero.Settings = {
            limit: 6,
            sections: sections
        };

        let helper: ComponentTestHelper<DisplayContentBlockComponent>;

        beforeEach(angular.mock.module("templates"));

        /**
         * The beforeEach procedure will initialize the helper and parse
         * the component according to the given providers. Unfortunetly, in
         * this mode, the providers and properties given to the construtor
         * can't be overriden.
        */
        beforeEach((done) => {
            // Create the component bed for the test. Optionally, this could be done
            // in each test if one needs customization of these parameters per test
            let cls = createClass({
                template: htmlTemplate,
                directives: [DisplayContentBlockComponent],
                providers: providers,
                properties: {
                    block: {
                        settings: settings
                     }
                }
            });
            helper = new ComponentTestHelper<DisplayContentBlockComponent>(cls, done);
        });

        it("verify settings is injected", () => {
           expect(helper.component.block).not.toBeNull;
           expect(helper.component.block.settings).not.toBeNull;
           expect(helper.component.block.settings.limit).toEqual(6);
           expect(helper.component.block.settings.sections.length).toEqual(3);
        });

        it("verify abstract is displayed", () => {
            expect(helper.all("div[ng-bind-html|='article.abstract']")[0]).not.toBeNull;
        });

        it("verify title is displayed", () => {
            expect(helper.all("div > h5")[0]).not.toBeNull;
        });

        it("verify body is not displayed", () => {
            expect(helper.all("div[ng-bind-html|='article.body']")[0]).toBeNull;
        });
    });
});
