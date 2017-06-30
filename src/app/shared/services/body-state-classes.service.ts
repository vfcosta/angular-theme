import { LocalStorageService } from 'angular-2-local-storage';
import { Directive, Inject, Injectable } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { AuthEvents } from "../../login/auth-events";
import { AuthService } from "./../../login/auth.service";
import { HtmlUtils } from "../html-utils";
import { DesignModeService } from './design-mode.service';

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
export class BodyStateClassesService {

    private started: boolean = false;
    private skin: string;

    public static get DESIGN_MODE_ON_CLASSNAME(): string { return "noosfero-design-on"; }
    public static get USER_LOGGED_CLASSNAME(): string { return "noosfero-user-logged"; }
    public static get ROUTE_STATE_CLASSNAME_PREFIX(): string { return "noosfero-route-"; }
    public static get CONTENT_WRAPPER_FULL(): string { return "full-content"; }

    private bodyElement: ng.IAugmentedJQuery = null;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private authService: AuthService,
        private designModeService: DesignModeService,
        private localStorageService: LocalStorageService) { }

    start(config?: StartParams) {
        if (!this.started) {
            this.setupUserLoggedClassToggle();
            this.setupStateClassToggle();
            this.setupDesignModeClassToggle();
            if (config) {
                this.setThemeSkin(this.localStorageService.get<string>('skin') || config.skin);
            }
            this.started = true;
        }
    }

    setThemeSkin(skin: string) {
        this.getBodyElement().removeClass(this.getThemeSkin());
        this.getBodyElement().addClass(skin);
        this.localStorageService.set('skin', skin);
    }

    getThemeSkin() {
        return this.localStorageService.get<string>('skin');
    }

    addBodyClass(className: string) {
        this.getBodyElement().addClass(className);
    }

    removeBodyClass(className: string) {
        this.getBodyElement().removeClass(className);
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

    private switchStateClasses(bodyElement: ng.IAugmentedJQuery, state: ng.ui.IState) {
        HtmlUtils.removeCssClassByPrefix(bodyElement[0], BodyStateClassesService.ROUTE_STATE_CLASSNAME_PREFIX);
        bodyElement.addClass(BodyStateClassesService.ROUTE_STATE_CLASSNAME_PREFIX + state.name);
    }

    /**
     * setup the listeners to the desigModeService to add class on the Body Element
     * indicating the user activated the designMode
     */
    private setupDesignModeClassToggle() {
        this.toggleDesignModeClass(this.designModeService.isInDesignMode());
        this.designModeService.onToggle.subscribe((designOn: boolean) => {
            this.toggleDesignModeClass(designOn);
        });
    }

    private toggleDesignModeClass(designOn: boolean) {
        if (designOn) {
            this.getBodyElement().addClass(BodyStateClassesService.DESIGN_MODE_ON_CLASSNAME);
        } else {
            this.getBodyElement().removeClass(BodyStateClassesService.DESIGN_MODE_ON_CLASSNAME);
        }
    }

    private setupStateClassToggle() {
        let bodyElement = this.getBodyElement();
        // bodyElement.addClass(BodyStateClassesService.ROUTE_STATE_CLASSNAME_PREFIX + this.$state.current.name);
        // this.$transitions.onSuccess({}, (trans) => {
        //     this.switchStateClasses(bodyElement, trans.$to());
        // });
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
            this.bodyElement = angular.element(angular.element(this.document).find("body"));
        }
        return this.bodyElement;
    }

    private getContentWrapper(selector?: string) {
        let doc = angular.element(this.document);
        return doc.query(selector || '.content-wrapper');
    }
}
