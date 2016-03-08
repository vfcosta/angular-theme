import {quickCreateComponent} from "../../spec/helpers";
import {Profile} from "./profile.component";

describe("Components", () => {
    describe("Profile Component", () => {

        let $rootScope: ng.IRootScopeService;
        let $q: ng.IQService;
        let profileServiceMock: any;
        let $stateParams: any;

        beforeEach(inject((_$rootScope_: ng.IRootScopeService, _$q_: ng.IQService) => {
            $rootScope = _$rootScope_;
            $q = _$q_;
        }));

        beforeEach(() => {
            $stateParams = jasmine.createSpyObj("$stateParams", ["profile"]);
            profileServiceMock = jasmine.createSpyObj("profileServiceMock", ["getByIdentifier", "getBoxes", "setCurrentProfile"]);

            let getByIdentifierResponse = $q.defer();
            getByIdentifierResponse.resolve({ data: [{ id: 1 }] });
            let getBoxesResponse = $q.defer();
            getBoxesResponse.resolve({ data: { boxes: [{ id: 2 }] } });

            profileServiceMock.getByIdentifier = jasmine.createSpy("getByIdentifier").and.returnValue(getByIdentifierResponse.promise);
            profileServiceMock.getBoxes = jasmine.createSpy("getBoxes").and.returnValue(getBoxesResponse.promise);
        });

        it("get the profile and store in profile service", done => {
            let component: Profile = new Profile(profileServiceMock, $stateParams);
            $rootScope.$apply();
            expect(profileServiceMock.getByIdentifier).toHaveBeenCalled();
            expect(profileServiceMock.setCurrentProfile).toHaveBeenCalled();
            expect(component.profile).toEqual({ id: 1 });
            done();
        });

        it("get the profile boxes", done => {
            let component: Profile = new Profile(profileServiceMock, $stateParams);
            $rootScope.$apply();
            expect(profileServiceMock.getBoxes).toHaveBeenCalled();
            expect(component.boxes).toEqual([{ id: 2 }]);
            done();
        });
    });
});
