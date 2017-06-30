import { Input, Component, Inject } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthService, SessionService, AuthEvents } from "../../login";
import { TranslatorService } from "../../shared/services/translator.service";
import { DesignModeService } from "../../shared/services/design-mode.service";

@Component({
    selector: 'noosfero-block',
    template: require('app/layout/blocks/block.html')
})
export class BlockComponent {

    @Input() block: noosfero.Block;
    @Input() box: noosfero.Box;
    @Input() owner: noosfero.Profile | noosfero.Environment;

    currentUser: noosfero.User;
    isHomepage = true;
    designMode = false;
    blockTitle = 'Meu titulo';

    constructor(
        @Inject("$state") private $state: ng.ui.IStateService,
        private notificationService: NotificationService,
        private authService: AuthService,
        private sessionService: SessionService,
        private translatorService: TranslatorService,
        private designModeService: DesignModeService,
        @Inject("$transitions") private $transitions) {

        this.currentUser = this.sessionService.currentUser();
        this.authService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {
            this.currentUser = this.sessionService.currentUser();
            this.verifyHomepage();
        });
        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
            this.currentUser = this.sessionService.currentUser();
            this.verifyHomepage();
        });
        this.$transitions.onSuccess({}, (trans) => {
            this.verifyHomepage();
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
        if (this.owner && ["Profile", "Community", "Person"].indexOf((<any>this.owner)['type']) >= 0) {
            let profile = <noosfero.Profile>this.owner;
            this.isHomepage = this.$state.current.name === "main.profile.home";
            if (profile.homepage) {
                this.isHomepage = this.isHomepage ||
                    (this.$state.current.name === "main.profile.page" && profile.homepage === this.$state.params['page']);
            } else {
                this.isHomepage = this.isHomepage || this.$state.current.name === "main.profile.info";
            }
        } else {
            this.isHomepage = this.$state.current.name === "main.environment.home";
        }
    }

    markForDeletion() {
        this.block._destroy = true;
    }

    canDelete() {
        return this.block.type !== 'MainBlock';
    }
    
    updateText(event){
        console.log(" KKKKKKKKKKKK", event);
        this.block.title = event;
    }
}
