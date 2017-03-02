import { Component } from 'ng-forward';
import { BlockComponent } from './block.component';
import * as helpers from "../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';
import { DesignModeService } from '../../shared/services/design-mode.service';

const htmlTemplate: string = '<noosfero-block [block]="ctrl.block" [owner]="ctrl.profile"></noosfero-block>';

describe("Block Component", () => {

    let helper: ComponentTestHelper<BlockComponent>;
    beforeEach(() => {
        angular.mock.module("templates");
    });

    let properties = {
        block: { id: 1, settings: { visualization: { columns: 7 } } },
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
                helpers.createProviderToValue('$uibModal', helpers.mocks.$modal),
                helpers.createProviderToValue('$state', state),
                helpers.createProviderToValue('NotificationService', helpers.mocks.notificationService),
                helpers.createProviderToValue('AuthService', helpers.mocks.authService),
                helpers.createProviderToValue('SessionService', helpers.mocks.sessionWithCurrentUser({})),
                helpers.createProviderToValue('TranslatorService', translatorService),
                helpers.createProviderToValue("EventsHubService", eventsHubService),
                helpers.createProviderToValue('DesignModeService', helpers.mocks.designModeService),
                helpers.createProviderToValue('noosferoTemplateFilter', helpers.mocks.noosferoTemplateFilter),
                helpers.createProviderToValue('$transitions', transitions),
            ]
        });
        helper = new ComponentTestHelper<BlockComponent>(cls, done);
    });
    let eventsHubService = jasmine.createSpyObj("eventsHubService", ["subscribeToEvent", "emitEvent"]);
    let translatorService = jasmine.createSpyObj("translatorService", ["currentLanguage"]);
    let transitions = jasmine.createSpyObj("transitions", ["onSuccess"]);
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
        state.current = { name: "main.environment.search" };
        helper.component.ngOnInit();
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

    it("display block actions in design mode", () => {
        helper.component.block = <any>{ id: 1, hide: false };
        helper.component.designMode = true;
        helper.detectChanges();
        expect(helper.all(".block-actions").length).toEqual(1);
    });

    it("not display block actions in normal mode", () => {
        helper.component.block = <any>{ id: 1, hide: false };
        helper.component.designMode = false;
        helper.detectChanges();
        expect(helper.all(".block-actions.ng-hide").length).toEqual(1);
    });

    it("set block columns according to visualization settings", () => {
        expect(helper.all(".noosfero-block.col-md-7").length).toEqual(1);
    });

    it("display block title if it's in design mode", () => {
        helper.component.block = <any>{ id: 1, title: '' };
        helper.component.designMode = true;
        helper.detectChanges();
        expect(helper.find(".panel-heading").attr('class').trim()).not.toContain("ng-hide");
    });

    it("display block title if the block has title", () => {
        helper.component.block = <any>{ id: 1, title: 'some title' };
        helper.detectChanges();
        expect(helper.find(".panel-title").html()).toContain('some title');
    });


});
