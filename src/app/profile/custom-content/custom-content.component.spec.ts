import {CustomContentComponent} from './custom-content.component';
import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';
import * as helpers from "../../../spec/helpers";

const htmlTemplate: string = '<custom-content [attribute]="\'custom_footer\'" [profile]="ctrl.profile"></custom-content>';

describe("Components", () => {
    describe("Custom Content Component", () => {

        let helper: ComponentTestHelper<CustomContentComponent>;
        beforeEach(angular.mock.module("templates"));
        beforeEach(angular.mock.module("ngSanitize"));

        beforeEach((done) => {
            let profileService = jasmine.createSpyObj("profileService", ["update"]);
            let notificationService = jasmine.createSpyObj("notificationService", ["success"]);
            let properties = { profile: { custom_footer: "footer" } };
            let cls = createClass({
                template: htmlTemplate,
                directives: [CustomContentComponent],
                properties: properties,
                providers: [
                    helpers.createProviderToValue("$uibModal", helpers.mocks.$modal),
                    helpers.createProviderToValue("ProfileService", profileService),
                    helpers.createProviderToValue("NotificationService", notificationService)
                ]
            });
            helper = new ComponentTestHelper<CustomContentComponent>(cls, done);
        });

        it("set modal instance when open edit modal", () => {
            helper.component['$uibModal'].open = jasmine.createSpy("open");
            helper.component.openEdit();
            expect(helper.component['$uibModal'].open).toHaveBeenCalled();
            expect(helper.component.originalContent).toEqual(helper.component.content);
        });

        it("restore original content when cancelled", () => {
            helper.component.openEdit();
            helper.component.content = "modified";
            helper.component.cancel();
            expect(helper.component.content).toEqual(helper.component.originalContent);
        });

        it("keep modified content when click on preview", () => {
            helper.component.openEdit();
            helper.component.content = "modified";
            helper.component.preview();
            expect(helper.component.content).toEqual("modified");
        });

        it("not override original content when cancelled openEdit again", () => {
            helper.component.openEdit();
            helper.component.content = "modified";
            helper.component.openEdit();
            expect(helper.component.originalContent).toEqual("footer");
        });

        it("reset modal instance when close edit modal", () => {
            let modalInstance = jasmine.createSpyObj("modalInstance", ["close"]);
            helper.component['$uibModal'].open = jasmine.createSpy("open").and.returnValue(modalInstance);
            helper.component.openEdit();
            expect(helper.component['$uibModal'].open).toHaveBeenCalled();
            helper.component.cancel();
            expect(modalInstance.close).toHaveBeenCalled();
            expect(helper.component['modalInstance']).toBeNull();
        });

        it("call profile service to update profile when save", () => {
            helper.component['profileService'].update = jasmine.createSpy("update").and.returnValue({
                then: (func: Function) => { func(); }
            });
            helper.component.save();
            expect(helper.component['notificationService'].success).toHaveBeenCalled();
        });
    });
});
