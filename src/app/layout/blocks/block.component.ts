import { ProfileComponent } from './../../profile/profile.component';
import { ActivitiesComponent } from './../../profile/activities/activities.component';
import { NavigationEnd, Router, Event, ActivatedRoute } from '@angular/router';
import { Input, Component } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthService, SessionService, AuthEvents } from "../../login";
import { TranslatorService } from "../../shared/services/translator.service";
import { DesignModeService } from "../../shared/services/design-mode.service";
import { animateFactory } from 'ng2-animate';

@Component({
    selector: 'noosfero-block',
    template: require('app/layout/blocks/block.html'),
    animations: [animateFactory(500, 0, 'ease-in')]
})
export class BlockComponent {

    @Input() block: noosfero.Block;
    @Input() box: noosfero.Box;
    @Input() owner: noosfero.Profile | noosfero.Environment;

    currentUser: noosfero.User;
    isHomepage = true;
    designMode = false;
    animation: string;

    constructor(
        private notificationService: NotificationService,
        private authService: AuthService,
        private sessionService: SessionService,
        private translatorService: TranslatorService,
        private designModeService: DesignModeService,
        private router: Router, private route: ActivatedRoute) {

        this.currentUser = this.sessionService.currentUser();
        this.authService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {
            this.currentUser = this.sessionService.currentUser();
            this.verifyHomepage();
        });
        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
            this.currentUser = this.sessionService.currentUser();
            this.verifyHomepage();
        });
        router.events.subscribe((event: Event) => {
             if (event instanceof NavigationEnd) this.verifyHomepage();
        });
        this.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            this.designMode = designModeOn;
        });
    }

    ngOnInit() {
        this.verifyHomepage();
        this.designMode = this.designModeService.isInDesignMode();
        if (!this.block.settings) this.block.settings = <noosfero.Settings>{};
        if (!this.block.settings.visualization) {
            this.block.settings.visualization = {};
        }
        if (!this.block.id) {
            this.animation = "zoomInDown";
        }
    }

    canDisplay() {
        if (this.block._destroy) return false;
        if (this.designMode) return true;
        return this.visible() && this.displayToUser() &&
            this.displayOnLanguage(this.translatorService.currentLanguage()) &&
            !this.block.hide;
    }

    blockClass() {
        if (!this.block || !this.block.type) return null;
        return this.block.type.toLowerCase().replace(/::/, '-');
    }

    protected visible() {
        let display = this.block.settings ? (<any>this.block.settings)['display'] : null;
        return !display || ((this.isHomepage ? display !== "except_home_page" : display !== "home_page_only") && display !== "never");
    }

    protected displayToUser() {
        let displayUser = this.block.settings ? (<any>this.block.settings)['display_user'] : null;
        return !displayUser || displayUser === "all" ||
            (this.currentUser ? displayUser === "logged" : displayUser === "not_logged");
    }

    protected displayOnLanguage(language: string) {
        let displayLanguage = this.block.settings ? (<any>this.block.settings)['language'] : null;
        return !displayLanguage || displayLanguage === "all" ||
            language === displayLanguage;
    }

    protected verifyHomepage() {
        if (this.owner && this.owner.type !== "Environment") {
            let profile = <noosfero.Profile>this.owner;
            if (profile.homepage) {
                this.isHomepage = this.router.url === profile.homepage;
            } else {
                this.isHomepage = [ActivitiesComponent, ProfileComponent].indexOf(<any>this.route.snapshot.component) >= 0;
            }
        } else {
            this.isHomepage = this.router.url === "/";
        }
    }

    markForDeletion() {
        this.block._destroy = true;
        this.animation = "zoomOutUp";
    }

    canDelete() {
        return this.block.type !== 'MainBlock';
    }

    updateText(event) {
        this.block.title = event;
    }
}
