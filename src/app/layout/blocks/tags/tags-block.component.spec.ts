import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';

import { TagsBlockComponent } from './tags-block.component';

const htmlTemplate: string = '<noosfero-tags-cloud-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-tags-cloud-block>';

describe("Components", () => {
    describe("Tags Block Component", () => {

        let environmentService = jasmine.createSpyObj("EnvironmentService", ["getCurrentEnvironment", "getTags"]);
        environmentService.getCurrentEnvironment = jasmine.createSpy("getCurrentEnvironment").and.returnValue(helpers.mocks.promiseResultTemplate({ id: 1, name: 'Noosfero' }));
        environmentService.getTags = jasmine.createSpy("getTags").and.returnValue(helpers.mocks.promiseResultTemplate({ data: [{ name: "foo", count: 10, link: '/tag/foo' }, { name: "bar", count: 20, link: '/tag/bar' }] }));

        let state = jasmine.createSpyObj("$state", ["reload"]);
        let helper: ComponentTestHelper<TagsBlockComponent>;

        beforeEach(() => {
            angular.mock.module("templates");
        });

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [TagsBlockComponent],
                properties: {
                    block: {}
                },
                providers: [
                    helpers.createProviderToValue("$state", state),
                    helpers.createProviderToValue('EnvironmentService', environmentService)
                ]
            });
            helper = new ComponentTestHelper<TagsBlockComponent>(cls, done);
        });

        it("get tags from the environment service", () => {
            expect(environmentService.getTags).toHaveBeenCalled();
            expect(helper.component.tags).toEqual([{ text: "foo", weight: 10, link: '/tag/foo' }, { text: "bar", weight: 20, link: '/tag/bar' }]);
        });

    });
});
