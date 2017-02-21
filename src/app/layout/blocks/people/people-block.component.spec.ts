import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider} from 'ng-forward';
import {ComponentTestHelper, createClass} from '../../../../spec/component-test-helper';
import {providers} from 'ng-forward/cjs/testing/providers';
import {PeopleBlockComponent} from './people-block.component';
import * as helpers from "../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-people-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-people-block>';

describe("Components", () => {

    describe("People Block Component", () => {

        let environmentService = jasmine.createSpyObj("EnvironmentService", ["getCurrentEnvironment", "getTags"]);
        environmentService.getCurrentEnvironment = jasmine.createSpy("getCurrentEnvironment").and.returnValue(helpers.mocks.promiseResultTemplate({ id: 1, name: 'Noosfero' }));
        environmentService.getEnvironmentPeople = jasmine.createSpy("getEnvironmentPeople").and.returnValue(helpers.mocks.promiseResultTemplate({ data: [{ identifier: "person1" }] }));

        let helper: ComponentTestHelper<PeopleBlockComponent>;

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
                directives: [PeopleBlockComponent],
                providers: [helpers.createProviderToValue('EnvironmentService', environmentService)],
                properties: {}
            });
            helper = new ComponentTestHelper<PeopleBlockComponent>(cls, done);
        });

        /**
         * By default the helper will have the component, with all properties
         * ready to be used. Here the mock provider 'EnvironmentService' will
         * return the given array with one person.
         */
        it("get block with one people", () => {
            expect(environmentService.getCurrentEnvironment).toHaveBeenCalled();
            expect(environmentService.getEnvironmentPeople).toHaveBeenCalled();
            expect(helper.component.people[0].identifier).toEqual("person1");
        });

        /**
         * There are helper functions to access the JQuery DOM like this.
         */
        it("render the profile image for each person", () => {
            expect(helper.all("noosfero-profile-image").length).toEqual(1);
        });

        /**
         * The main debugElement element is also available
         */
        it("render the main noosfero people block", () => {
            expect(helper.debugElement.children().length).toEqual(1, "The people-block should have a div children");
        });

        /**
         * Just another example of a JQuery DOM helper function
         */
        it("render the noosfero people block div", () => {
            let div = helper.findChildren("noosfero-people-block", "div");
            expect(div.className).toBe('people-block', "The class should be people-block");
        });
    });
});
