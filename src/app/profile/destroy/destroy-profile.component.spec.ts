import { DestroyProfileComponent } from './destroy-profile.component';
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';
import * as helpers from "../../../spec/helpers";

const htmlTemplate: string = '<destroy-profile></destroy-profile>';

describe("Components", () => {
    describe("Destroy Profile Component", () => {

        let stateMock: any;
        let notificationMock: any;
        let profileServiceMock: any;
        let profile = { id: 1, identifier: "profile" };

        let helper: ComponentTestHelper<DestroyProfileComponent>;
        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            stateMock = jasmine.createSpyObj("$state", ["go"]);
            notificationMock = jasmine.createSpyObj("notificationService", ["confirmation", "success", "error"]);
            profileServiceMock = jasmine.createSpyObj("profileService", ["getCurrentProfile", "remove"]);
            profileServiceMock.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(helpers.mocks.promiseResultTemplate(profile));
            notificationMock.confirmation = (options: any, func: Function) => {
                func();
            };
            spyOn(notificationMock, 'confirmation').and.callThrough();
            profileServiceMock.remove = jasmine.createSpy("remove").and.returnValue(helpers.mocks.promiseResultTemplate({data: {success: true}}));

            let cls = createClass({
                template: htmlTemplate,
                directives: [DestroyProfileComponent],
                providers: [
                    helpers.createProviderToValue('$state', stateMock),
                    helpers.createProviderToValue('NotificationService', notificationMock),
                    helpers.createProviderToValue('ProfileService', profileServiceMock)
                ]
            });
            helper = new ComponentTestHelper<DestroyProfileComponent>(cls, done);
        });

        it("display confirmation dialog", () => {
            expect(notificationMock.confirmation).toHaveBeenCalled();
        });

        it("not display confirmation dialog when profile doesn't exists", () => {
            profileServiceMock.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(helpers.mocks.promiseResultTemplate(null));
            notificationMock.confirmation = jasmine.createSpy("confirmation");
            new DestroyProfileComponent(stateMock, notificationMock, profileServiceMock);
            expect(notificationMock.confirmation).not.toHaveBeenCalled();
        });

        it("call remove in profile service when confirm", () => {
            expect(profileServiceMock.remove).toHaveBeenCalled();
        });
    });
});
