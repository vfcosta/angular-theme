import { Router, NavigationEnd, Event, ActivatedRoute } from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Directive, Inject, Injectable, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { AuthEvents } from '../../login/auth-events';
import { AuthService } from './../../login/auth.service';
import { DesignModeService } from './design-mode.service';
import * as _ from "lodash";

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

    private started = false;
    public skin: string;
    public bodyClasses: string[] = [];
    public changeClasses = new EventEmitter<string[]>();

    public static get DESIGN_MODE_ON_CLASSNAME(): string { return "noosfero-design-on"; }
    public static get USER_LOGGED_CLASSNAME(): string { return "noosfero-user-logged"; }
    public static get ROUTE_STATE_CLASSNAME_PREFIX(): string { return "noosfero-route-"; }
    public static get CONTENT_WRAPPER_FULL(): string { return "full-content"; }

    constructor(private router: Router, private route: ActivatedRoute,
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
                this.setThemeSkin(this.localStorageService.retrieve('skin') || config.skin);
            }
            this.started = true;
        }
    }

    setThemeSkin(skin: string) {
        this.removeBodyClass(this.skin);
        this.skin = skin;
        this.addBodyClass(this.skin);
        this.localStorageService.store('skin', skin);
    }

    getThemeSkin() {
        return this.localStorageService.retrieve('skin');
    }

    addBodyClass(className: string) {
        this.bodyClasses.push(className);
        this.changeClasses.next(this.bodyClasses);
    }

    removeBodyClass(className: string) {
        _.remove(this.bodyClasses, (cl: string) => cl === className);
        this.changeClasses.next(this.bodyClasses);
    }

    private switchStateClasses(stateName: string) {
        _.remove(this.bodyClasses, (cl: string) => {
            return cl.startsWith(BodyStateClassesService.ROUTE_STATE_CLASSNAME_PREFIX);
        });
        this.addBodyClass(BodyStateClassesService.ROUTE_STATE_CLASSNAME_PREFIX + stateName);
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
            this.addBodyClass(BodyStateClassesService.DESIGN_MODE_ON_CLASSNAME);
        } else {
            this.removeBodyClass(BodyStateClassesService.DESIGN_MODE_ON_CLASSNAME);
        }
    }

    private getLastChildRoute(current: any) {
        for (const child of current.children) {
            if (child.children.length > 0) {
                return this.getLastChildRoute(child);
            } else {
                return child;
            }
        }
        return current;
    }

    private setupStateClassToggle() {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                const lastComponent = this.getLastChildRoute(this.router.routerState.root).component;
                let stateName = "";
                if (lastComponent) stateName = lastComponent.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                this.switchStateClasses(stateName);
            }
        });
    }

    /**
     * Setup the initial state of the user-logged css class
     * and adds events handlers to switch this class when the login events happens
     */
    private setupUserLoggedClassToggle() {
        // get initial logged information from the AuthService
        // add add the css class when the user is authenticated
        if (this.authService.isAuthenticated()) {
            this.addBodyClass(BodyStateClassesService.USER_LOGGED_CLASSNAME);
        } else {
            this.removeBodyClass(BodyStateClassesService.USER_LOGGED_CLASSNAME);
        }

        // to switch the css class which indicates user logged in
        this.authService.loginSuccess.subscribe(() => {
            this.addBodyClass(BodyStateClassesService.USER_LOGGED_CLASSNAME);
        });

        this.authService.logoutSuccess.subscribe(() => {
            this.removeBodyClass(BodyStateClassesService.USER_LOGGED_CLASSNAME);
        });
    }
}
