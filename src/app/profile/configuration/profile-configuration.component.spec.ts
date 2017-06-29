import { ComponentTestHelper, createClass } from './../../../spec/component-test-helper';
import { UiSrefDirective } from './../../shared/directives/ui-sref-directive';
import { ProfileConfigurationComponent } from './profile-configuration.component';
import * as helpers from "../../../spec/helpers";
import { provideFilters } from '../../../spec/helpers';

describe("Components", () => {
    describe("Profile Configuration Component", () => {
        let component: ProfileConfigurationComponent;
        let $stateParams = { profile: 'identifier' };
        let profileServiceMock: any;
        let sessionServiceMock: any;
        let profile = { id: 1, identifier: 'identifier' };
        let $q: ng.IQService;
        let helper: ComponentTestHelper<ProfileConfigurationComponent>;
        let $rootScope: ng.IRootScopeService;
        let $state: ng.ui.IStateService;

        beforeEach(inject((_$rootScope_: ng.IRootScopeService, _$q_: ng.IQService) => {
            $rootScope = _$rootScope_;
            $q = _$q_;
        }));

        beforeEach(() => {
            profileServiceMock = jasmine.createSpyObj("profileServiceMock", ["setCurrentProfileByIdentifier"]);
            $state = jasmine.createSpyObj("$state", ["go"]);
            $state.go = jasmine.createSpy("go").and.returnValue($q.defer().resolve(''));
            $state.is = jasmine.createSpy("is");
            let profilePromise = $q.defer();
            profilePromise.resolve(profile);

            profileServiceMock.setCurrentProfileByIdentifier = jasmine.createSpy("setCurrentProfileByIdentifier").and.returnValue(profilePromise.promise);
        });

        it("set profile service", (done => {
            $stateParams['parent_id'] = 1;
            let component: ProfileConfigurationComponent = new ProfileConfigurationComponent(profileServiceMock, $stateParams, $state);
            $rootScope.$apply();
            expect(profileServiceMock.setCurrentProfileByIdentifier).toHaveBeenCalled();
            expect(component.profile.identifier).toEqual("identifier");
            done();
        }));
    });
});
