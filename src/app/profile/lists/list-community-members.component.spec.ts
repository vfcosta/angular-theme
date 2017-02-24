import * as helpers from "../../../spec/helpers";
import {ComponentTestHelper, createClass} from './../../../spec/component-test-helper';
import {ListCommunityMembersComponent} from './list-community-members.component';

const htmlTemplate: string = '<list-community-members></list-community-members>';

describe("Components", () => {

    describe("List Community Members Component", () => {

        let helper: ComponentTestHelper<ListCommunityMembersComponent>;
        let profileService = jasmine.createSpyObj("profileService", ["getCurrentProfile", "getMembers"]);
        let currentProfile = {id: 1};
        let members = [{id: 1 }, { id: 2 }];

        profileService.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(
          Promise.resolve({
              data: currentProfile
          }));

        profileService.getMembers = jasmine.createSpy("getMembers").and.returnValue(
          Promise.resolve({
              headers: () => { },
              data: members
          }));

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {

            let cls = createClass({
                template: htmlTemplate,
                directives: [ListCommunityMembersComponent],
                providers:  [
                    helpers.createProviderToValue("ProfileService", profileService)
                ]
            });

            helper = new ComponentTestHelper<ListCommunityMembersComponent>(cls, done);
        });

        it("load current profile", () => {
            expect(profileService.getCurrentProfile).toHaveBeenCalled();
        });

        it("load profile members", () => {
            expect(profileService.getMembers).toHaveBeenCalled();
        });

        it("load profile members with parameters", () => {
            expect(profileService.getMembers).toHaveBeenCalledWith({ data: { id: 1 } }, { page: 1, per_page: 20 });
        });

    });

});