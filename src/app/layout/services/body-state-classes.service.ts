import {Directive, Inject, Injectable} from "ng-forward";
import {AuthEvents} from "../../login/auth-events";
import {AuthService} from "./../../login/auth.service";
import {HtmlUtils} from "../html-utils";
import {INgForwardJQuery} from 'ng-forward/cjs/util/jqlite-extensions';

export interface StartParams {
    skin?: string;
}

/**
 * This is a service which adds classes to the body element
 * indicating some app states information as
 * eg:
 *    User Logged:
 *         - noosfero-user-logged
 *    Route States:
 *         - noosfero-route-main
 *         - noosfero-route-main.profile.info
 *
 *    Show the all content in full mode:
 *         - full-content
 */
@Injectable()
@Inject("$rootScope", "$document", "$state", AuthService)
export class BodyStateClassesService {

    private started: boolean = false;
    private skin: string;

    public static get USER_LOGGED_CLASSNAME(): string { return "noosfero-user-logged"; }
    public static get ROUTE_STATE_CLASSNAME_PREFIX(): string { return "noosfero-route-"; }
    public static get CONTENT_WRAPPER_FULL(): string { return "full-content"; }

    private bodyElement: ng.IAugmentedJQuery = null;

    constructor(
        private $rootScope: ng.IRootScopeService,
        private $document: ng.IDocumentService,
        private $state: ng.ui.IStateService,
        private authService: AuthService
    ) {

    }

    start(config?: StartParams) {
        if (!this.started) {
            this.setupUserLoggedClassToggle();
            this.setupStateClassToggle();

            if (config) {
                this.setThemeSkin(config.skin);
            }
            this.started = true;
        }
    }

    setThemeSkin(skin: string) {
        this.getBodyElement().addClass(skin);
    }

    addContentClass(addClass: boolean, className?: string): BodyStateClassesService {

        let fullContentClass: string = className || BodyStateClassesService.CONTENT_WRAPPER_FULL;
        let contentWrapper = this.getContentWrapper();

        if (contentWrapper) {
            if (addClass) {
                contentWrapper.addClass(fullContentClass);
            } else {
                contentWrapper.removeClass(fullContentClass);
            }
        }
        return this;
    }

    private getStateChangeSuccessHandlerFunction(bodyElement: ng.IAugmentedJQuery): (event: ng.IAngularEvent, toState: ng.ui.IState) => void {
        let self = this;
        return (event: ng.IAngularEvent, toState: ng.ui.IState) => {
            self.switchStateClasses(bodyElement, toState);
        };
    }

    private switchStateClasses(bodyElement: ng.IAugmentedJQuery, state: ng.ui.IState) {
        HtmlUtils.removeCssClassByPrefix(bodyElement[0], BodyStateClassesService.ROUTE_STATE_CLASSNAME_PREFIX);
        bodyElement.addClass(BodyStateClassesService.ROUTE_STATE_CLASSNAME_PREFIX + state.name);
    }

    /**
     * Setup the initial class name on body element indicating the current route
     * and adds event handler to swith this class when the current page/state changes
     */
    private setupStateClassToggle() {
        let bodyElement = this.getBodyElement();
        bodyElement.addClass(BodyStateClassesService.ROUTE_STATE_CLASSNAME_PREFIX + this.$state.current.name);
        this.$rootScope.$on("$stateChangeSuccess", this.getStateChangeSuccessHandlerFunction(bodyElement));
    }

    /**
     * Setup the initial state of the user-logged css class
     * and adds events handlers to switch this class when the login events happens
     */
    private setupUserLoggedClassToggle() {
        let bodyElement = this.getBodyElement();

        // get initial logged information from the AuthService
        // add add the css class when the user is authenticated
        if (this.authService.isAuthenticated()) {
            bodyElement.addClass(BodyStateClassesService.USER_LOGGED_CLASSNAME);
        }

        // to switch the css class which indicates user logged in
        this.authService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {
            bodyElement.addClass(BodyStateClassesService.USER_LOGGED_CLASSNAME);
        });

        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
            bodyElement.removeClass(BodyStateClassesService.USER_LOGGED_CLASSNAME);
        });
    }

    /**
     * Returns the user 'body' html Element
     */
    private getBodyElement(): ng.IAugmentedJQuery {
        if (this.bodyElement === null) {
            this.bodyElement = angular.element(this.$document.find("body"));
        }
        return this.bodyElement;
    }

    private getContentWrapper(selector?: string): INgForwardJQuery {
        let doc = <INgForwardJQuery>angular.element(this.$document);
        return doc.query(selector || '.content-wrapper');
    }
}
