import { TestComponentBuilder } from 'ng-forward/cjs/testing/test-component-builder';
import { Provider } from 'ng-forward';
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';
import { CommunitiesBlockComponent } from './communities-block.component';

const htmlTemplate: string = '<noosfero-communities-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-communities-block>';

describe("Components", () => {

    describe("Community Block Component", () => {
        let serviceMock = {
            getApiContent: (block: any): any => {
                return Promise.resolve({ communities: [{ identifier: "community1" }] });
            }
        };

        let providers = [new Provider('BlockService', { useValue: serviceMock })];

        let helper: ComponentTestHelper<CommunitiesBlockComponent>;

        beforeEach(angular.mock.module("templates"));
        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [CommunitiesBlockComponent],
                providers: providers,
                properties: {}
            });
            helper = new ComponentTestHelper<CommunitiesBlockComponent>(cls, done);
        });

        it("get block with one community", done => {
            expect(helper.component.profiles[0].identifier).toEqual("community1");
            done();
        });

        it("render the profile image for each community", () => {
            expect(helper.all("noosfero-profile-image").length).toEqual(1);
        });

        it("render the noosfero communities block", () => {
            expect(helper.all(".communities-block").length).toEqual(1);
        });

    });
});
