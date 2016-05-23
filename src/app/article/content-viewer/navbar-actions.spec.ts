import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider} from 'ng-forward';
import {ComponentTestHelper, createClass} from "./../../../spec/component-test-helper";
import {providers} from 'ng-forward/cjs/testing/providers';
import {ContentViewerActionsComponent} from '././content-viewer-actions.component';
import * as helpers from "../../../spec/helpers";

const htmlTemplate: string = '<content-viewer-actions [article]="ctrl.article" [profile]="ctrl.profile"></content-viewer-actions>';

describe("Components", () => {

    describe("Content Viewer Actions Component", () => {
        let serviceMock = {
            getEnvironmentPeople: (filters: any): any => {
                return Promise.resolve([{ identifier: "person1" }]);
            }
        };
        let providers = [
            new Provider('ArticleService', { useValue: helpers.mocks.articleService }),
            new Provider('ProfileService', { useValue: helpers.mocks.profileService })
        ];

        let helper: ComponentTestHelper<ContentViewerActionsComponent>;

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
                directives: [ContentViewerActionsComponent],
                providers: providers,
                properties: {}
            });
            helper = new ComponentTestHelper<ContentViewerActionsComponent>(cls, done);
        });

        it("render the actions new item menu", () => {
            expect(helper.all("a[class|='btn dropdown-toggle']")[0]).not.toBeNull();
        });

        it("render two menu item actions", () => {
            expect(helper.all("ul")[1].find("li").length).toBe(2);
        });
    });
});
