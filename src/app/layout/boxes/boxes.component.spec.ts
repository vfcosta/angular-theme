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
                helpers.createProviderToValue('$state', state),
                helpers.createProviderToValue('TranslatorService', translatorService)
            ]
        });
        helper = new ComponentTestHelper<BoxesComponent>(cls, done);
    });

    let translatorService = jasmine.createSpyObj("translatorService", ["currentLanguage"]);
    let state = jasmine.createSpyObj("state", ["current"]);
    state.current = { name: "" };

    it("renders boxes into a container", () => {
        expect(helper.find('div.col-md-6').length).toEqual(1);
        expect(helper.find('div.col-md-3').length).toEqual(1);
    });
});
