import {Directive, Inject, Injectable} from "ng-forward";
import {AuthEvents} from "./../../login/auth-events";
import {AuthService} from "./../../login/auth.service";
import {HtmlUtils} from "../html-utils";

/**
 * This is a service which adds classes to the body element
 * indicating some app states information as
 * eg:
 *    User Logged:
 *         - noosfero-user-logged
 *    Route States:
 *         - noosfero-route-main
 *         - noosfero-route-main.profile.info
 */
@Injectable()
@Inject("$rootScope", "$document", "$state", AuthService)
export class BodyStateClassesService {

    private started: boolean = false;

    public static get USER_LOGGED_CLASSNAME(): string { return "noosfero-user-logged"; }
    public static get ROUTE_STATE_CLASSNAME_PREFIX(): string { return "noosfero-route-"; }

    private bodyElement: ng.IAugmentedJQuery = null;

    constructor(
        private $rootScope: ng.IRootScopeService,
        private $document: ng.IDocumentService,
        private $state: ng.ui.IStateService,
        private authService: AuthService
    ) {

    }

    start() {
        if (!this.started) {
            this.setupUserLoggedClassToggle();
            this.setupStateClassToggle();
            this.started = true;
        }
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
}
