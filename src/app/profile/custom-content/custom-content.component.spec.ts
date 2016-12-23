import { CustomContentComponent } from './custom-content.component';
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';
import * as helpers from "../../../spec/helpers";
import { DesignModeService } from '../../shared/services/design-mode.service';

const htmlTemplate: string = '<custom-content [attribute]="\'custom_footer\'" [profile]="ctrl.profile"></custom-content>';

describe("Components", () => {
    describe("Custom Content Component", () => {

        let helper: ComponentTestHelper<CustomContentComponent>;
        beforeEach(angular.mock.module("templates"));
        beforeEach(angular.mock.module("ngSanitize"));

        beforeEach((done) => {
            let designModeService = { isInDesignMode: () => { return true; } };
            let properties = { profile: { custom_footer: "footer" } };
            let cls = createClass({
                template: htmlTemplate,
                directives: [CustomContentComponent],
                properties: properties,
                providers: [
                    helpers.createProviderToValue("$uibModal", helpers.mocks.$modal),
                    helpers.createProviderToValue("DesignModeService", designModeService)
                ]
            });
            helper = new ComponentTestHelper<CustomContentComponent>(cls, done);
        });

        it("set modal instance when open edit modal", () => {
            helper.component['$uibModal'].open = jasmine.createSpy("open");
            helper.component.openEdit();
            expect(helper.component['$uibModal'].open).toHaveBeenCalled();
            expect(helper.component.originalContent).toEqual(helper.component.profile.custom_footer);
        });

        it("restore original content when cancelled", () => {
            helper.component.openEdit();
            helper.component.profile.custom_footer = "modified";
            helper.component.cancel();
            expect(helper.component.profile.custom_footer).toEqual(helper.component.originalContent);
        });

        it("keep modified content when click on preview", () => {
            helper.component.openEdit();
            helper.component.profile.custom_footer = "modified";
            helper.component.preview();
            expect(helper.component.profile.custom_footer).toEqual("modified");
        });

        it("not override original content when cancelled openEdit again", () => {
            helper.component.openEdit();
            helper.component.profile.custom_footer = "modified";
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

        it("hide button to edit content when user doesn't have the permission", () => {
            helper.detectChanges();
            expect(helper.find(".actions").attr('style').trim()).toEqual('display: none;');
        });

        it("show button to edit content when user has the permission", () => {
            (<any>helper.component['profile'])['permissions'] = ['allow_edit'];
            helper.detectChanges();
            expect(helper.find(".actions").attr('style')).toEqual('');
        });
    });
});
