import { Pipe, Input, provide, Component } from 'ng-forward';
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';
import * as helpers from "../../../spec/helpers";

import { ProfileImageEditorComponent } from "./profile-image-editor.component";

describe("Components", () => {

    describe("Profile Image Editor Component", () => {

        beforeEach(angular.mock.module("templates"));

        let expectedData = "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQ…Cm2OLHvfdNPte3zrH709Q0esN1LPQ0t7DL696ERpu+9/8BVPLIpElf7VYAAAAASUVORK5CYII=";
        let testDataUrl = "data:image/png;base64," + expectedData;

        let profile = <noosfero.Profile>{ name: "profile_name", id: 1, identifier: "test" };
        let modal = helpers.mocks.$modal;
        let modalInstance = jasmine.createSpyObj("$uibModalInstance", ["close"]);
        let picFile = { type: "png" };
        let $q: ng.IQService;
        let personServiceMock: any;
        let $rootScope: ng.IRootScopeService;

        beforeEach(inject((_$q_: ng.IQService, _$rootScope_: ng.IRootScopeService) => {
            $q = _$q_;
            $rootScope = _$rootScope_;
        }));

        let comp = new ProfileImageEditorComponent(picFile, this.profile, personServiceMock, modalInstance);

        it("get data", done => {

            let result = comp.getData(testDataUrl);
            expect(result).toBe(expectedData);
            done();
        });

        it("get image name", done => {
            let imageName = "image1";
            let expectedName = "profile_name_" + imageName;
            comp['profile'] = profile;
            let result = comp.getImageName(imageName);
            expect(result).toBe(expectedName);
            done();
        });

        it("upload image", done => {
            let imageName = "image1";
            personServiceMock = jasmine.createSpyObj("personServiceMock", ["uploadImage"]);
            let deferredUploadImage = $q.defer();
            personServiceMock.uploadImage = jasmine.createSpy('uploadImage').and.returnValue(deferredUploadImage.promise);
            comp.personService = personServiceMock;
            comp.uploadImage(testDataUrl, imageName);
            deferredUploadImage.resolve();
            $rootScope.$apply();
            expect(comp.modalInstance.close).toHaveBeenCalled();
            done();
        });

    });
});
