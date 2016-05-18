import {Component} from 'ng-forward';
import {BoxesComponent} from './boxes.component';
import * as helpers from "../../../spec/helpers";
import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';

// this htmlTemplate will be re-used between the container components in this spec file
const htmlTemplate: string = '<noosfero-boxes [boxes]="ctrl.boxes" [owner]="ctrl.profile"></noosfero-blog>';


describe("Boxes Component", () => {

    let helper: ComponentTestHelper<BoxesComponent>;
    beforeEach(() => {
        angular.mock.module("templates");
    });

    let properties = {
        boxes: [
            { id: 1, position: 1 },
            { id: 2, position: 2 }
        ],
        owner: {
            id: 1,
            identifier: 'profile-name',
            type: 'Person'
        }
    };
    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [BoxesComponent],
            properties: properties,
            providers: [
                helpers.createProviderToValue('SessionService', helpers.mocks.sessionWithCurrentUser({})),
                helpers.createProviderToValue('AuthService', helpers.mocks.authService),
                helpers.createProviderToValue('$state', state)
            ]
        });
        helper = new ComponentTestHelper<BoxesComponent>(cls, done);
    });

    let state = jasmine.createSpyObj("state", ["current"]);
    state.current = { name: "" };

    it("renders boxes into a container", () => {
        expect(helper.find('div.col-md-7').length).toEqual(1);
        expect(helper.find('div.col-md-2-5').length).toEqual(1);
    });

    it("check the boxes order", () => {
        expect(helper.component.boxesOrder(properties['boxes'][0])).toEqual(1);
        expect(helper.component.boxesOrder(properties['boxes'][1])).toEqual(0);
    });

    it("set isHomepage as false by default", () => {
        expect(helper.component.isHomepage).toBeFalsy();
    });

    it("set isHomepage as true when in profile home page", () => {
        state.current = { name: "main.profile.home" };
        helper.component.ngOnInit();
        expect(helper.component.isHomepage).toBeTruthy();
    });

    it("set isHomepage as true when in environment home page", () => {
        state.current = { name: "main.environment.home" };
        helper.component.owner = <noosfero.Environment>{};
        helper.component.ngOnInit();
        expect(helper.component.isHomepage).toBeTruthy();
    });
});
