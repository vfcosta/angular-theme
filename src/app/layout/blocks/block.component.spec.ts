import {Component} from 'ng-forward';
import {BlockComponent} from './block.component';
import * as helpers from "../../../spec/helpers";
import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';
import {DesignModeService} from '../../admin/layout-edit/designMode.service';

const htmlTemplate: string = '<noosfero-block [block]="ctrl.block" [owner]="ctrl.profile"></noosfero-block>';

describe("Boxes Component", () => {

    let helper: ComponentTestHelper<BlockComponent>;
    beforeEach(() => {
        angular.mock.module("templates");
    });

    let properties = {
        block: { id: 1 },
        owner: {
            id: 1,
            identifier: 'profile-name',
            type: 'Person'
        }
    };
    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [BlockComponent],
            properties: properties,
            providers: [
                helpers.createProviderToValue('SessionService', helpers.mocks.sessionWithCurrentUser({})),
                helpers.createProviderToValue('AuthService', helpers.mocks.authService),
                helpers.createProviderToValue('$state', state),
                helpers.createProviderToValue('TranslatorService', translatorService),
                helpers.createProviderToValue('$uibModal', helpers.mocks.$modal),
                helpers.createProviderToValue('BlockService', blockService),
                helpers.createProviderToValue('NotificationService', helpers.mocks.notificationService),
                helpers.createProviderToValue('DesignModeService', helpers.mocks.designModeService)
            ]
        });
        helper = new ComponentTestHelper<BlockComponent>(cls, done);
    });
    let translatorService = jasmine.createSpyObj("translatorService", ["currentLanguage"]);
    let blockService = jasmine.createSpyObj("blockService", ["update"]);
    let state = jasmine.createSpyObj("state", ["current"]);
    state.current = { name: "" };

    it("set isHomepage as false by default", () => {
        expect(helper.component.isHomepage).toBeFalsy();
    });

    it("set isHomepage as true when in profile home page", () => {
        state.current = { name: "main.profile.home" };
        helper.component.ngOnInit();
        expect(helper.component.isHomepage).toBeTruthy();
    });

    it("set isHomepage as true when in profile info page", () => {
        state.current = { name: "main.profile.info" };
        helper.component.ngOnInit();
        expect(helper.component.isHomepage).toBeTruthy();
    });

    it("set isHomepage as true when in profile page", () => {
        state.current = { name: "main.profile.page" };
        state.params = { page: "/page" };
        (<noosfero.Profile>helper.component.owner).homepage = '/page';
        helper.component.ngOnInit();
        expect(helper.component.isHomepage).toBeTruthy();
    });

    it("set isHomepage as true when in environment home page", () => {
        state.current = { name: "main.environment.home" };
        helper.component.owner = <noosfero.Environment>{};
        helper.component.ngOnInit();
        expect(helper.component.isHomepage).toBeTruthy();
    });

    it("return true in canDisplay when no display option is setted", () => {
        helper.component.block = <any>{};
        expect(helper.component.canDisplay()).toEqual(true);
    });

    it("return false in canDisplay for an invisible block", () => {
        helper.component.block = <any>{ settings: { display: "never" } };
        expect(helper.component.canDisplay()).toEqual(false);
    });

    it("return false in canDisplay with except_home_page in homepage", () => {
        helper.component.block = <any>{ settings: { display_user: "except_home_page" } };
        expect(helper.component.canDisplay()).toEqual(false);
    });

    it("return false in canDisplay with home_page_only outside homepage", () => {
        helper.component.block = <any>{ settings: { display_user: "home_page_only" } };
        expect(helper.component.canDisplay()).toEqual(false);
    });

    it("return true in canDisplay when display_user is all for logged user", () => {
        helper.component.block = <any>{ settings: { display_user: "all" } };
        expect(helper.component.canDisplay()).toEqual(true);
    });

    it("return true in canDisplay when display_user is all for not logged user", () => {
        helper.component.currentUser = null;
        helper.component.block = <any>{ settings: { display_user: "all" } };
        expect(helper.component.canDisplay()).toEqual(true);
    });

    it("return false in canDisplay when display_user is logged for not logged user", () => {
        helper.component.currentUser = null;
        helper.component.block = <any>{ settings: { display_user: "logged" } };
        expect(helper.component.canDisplay()).toEqual(false);
    });

    it("return false in canDisplay when display_user is not_logged for logged user", () => {
        helper.component.block = <any>{ settings: { display_user: "not_logged" } };
        expect(helper.component.canDisplay()).toEqual(false);
    });

    it("return false in canDisplay when current language is not equal to language in block settings", () => {
        helper.component['translatorService'].currentLanguage = jasmine.createSpy("currentLanguage").and.returnValue("pt");
        helper.component.block = <any>{ settings: { language: "en" } };
        expect(helper.component.canDisplay()).toEqual(false);
    });

    it("return false in canDisplay when hide is true", () => {
        helper.component.block = <any>{ id: 1, hide: true };
        expect(helper.component.canDisplay()).toEqual(false);
    });

    it("return true in canDisplay when hide is not true", () => {
        helper.component.block = <any>{ id: 1, hide: false };
        expect(helper.component.canDisplay()).toEqual(true);
    });

});
