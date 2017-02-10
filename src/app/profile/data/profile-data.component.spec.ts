import * as helpers from "./../../../spec/helpers";
import {Injectable, Provider, provide} from "ng-forward";
import {providers} from 'ng-forward/cjs/testing/providers';
import {ProfileDataComponent} from "./profile-data.component";
import {TranslateProfile} from '../../shared/pipes/translate-profile.filter';
import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';

let htmlTemplate = '<profile-data></profile-data>';

describe('Profile data component', () => {

    let profileService: any;
    let profile = {
        id: 1, identifier: "profile-test", additional_data: { 'Address': 'Street A, Number 102' }
    };

    let helper: ComponentTestHelper<ProfileDataComponent>;
    beforeEach(angular.mock.module("templates"));

    beforeEach((done) => {
        profileService = jasmine.createSpyObj("profileService", ["getCurrentProfile"]);
        profileService.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(helpers.mocks.promiseResultTemplate(profile));


        let cls = createClass({
            template: htmlTemplate,
            directives: [ProfileDataComponent],
            providers: [
                helpers.createProviderToValue('ProfileService', profileService)
            ]
        });
        helper = new ComponentTestHelper<ProfileDataComponent>(cls, done);
    });

    it("renders profile-data directive", () => {
        expect(helper.all("div.table-responsive").length).toEqual(1);
        expect(helper.all("span.label-info").length).toEqual(1);
    });

    it('renders profile-data directive with custom fields', () => {
        expect(helper.all("div.profile-custom-fields").length).toEqual(1);
    });

});
