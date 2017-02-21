import * as helpers from "./../../../spec/helpers";
import {Injectable, Provider, provide} from "ng-forward";
import {providers} from 'ng-forward/cjs/testing/providers';
import {ProfileAboutComponent} from "./profile-about.component";
import {TranslateProfile} from '../../shared/pipes/translate-profile.filter';
import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';

let htmlTemplate = '<profile-about></profile-about>';

describe('Profile about component', () => {

    let profileService: any;
    let profile = {
        id: 1,
        identifier: "profile-test",
        type: 'Person',
        additional_data: { 'Address': 'Street A, Number 102' }
    };

    let helper: ComponentTestHelper<ProfileAboutComponent>;
    beforeEach(angular.mock.module("templates"));

    beforeEach((done) => {
        profileService = jasmine.createSpyObj("profileService", ["getCurrentProfile"]);
        profileService.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(helpers.mocks.promiseResultTemplate(profile));

        let cls = createClass({
            template: htmlTemplate,
            directives: [ProfileAboutComponent],
            providers: [
                helpers.createProviderToValue('ProfileService', profileService)
            ]
        });
        helper = new ComponentTestHelper<ProfileAboutComponent>(cls, done);
    });

    it("renders profile-about directive", () => {
        expect(helper.all("div.profile-about").length).toEqual(1);
    });

    it('renders profile-about directive with custom fields', () => {
        expect(helper.all("div.profile-custom-fields").length).toEqual(1);
    });

});
