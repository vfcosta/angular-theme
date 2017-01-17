import { Input, Component, Inject } from 'ng-forward';
import { BlockEditionComponent } from './block-edition/block-edition.component';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthService, SessionService, AuthEvents } from "../../login";
import { TranslatorService } from "../../shared/services/translator.service";
import { DesignModeService } from "../../shared/services/design-mode.service";

@Component({
    selector: 'noosfero-block',
    templateUrl: 'app/layout/blocks/block.html',
    directives: [BlockEditionComponent]
})
@Inject("$uibModal", "$scope", "$state", "$rootScope", NotificationService,
    AuthService, SessionService, TranslatorService, DesignModeService)
export class BlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile | noosfero.Environment;

    currentUser: noosfero.User;
    isHomepage = true;
    designMode = false;

    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $scope: ng.IScope,
        private $state: ng.ui.IStateService,
        private $rootScope: ng.IRootScopeService,
        private notificationService: NotificationService,
        private authService: AuthService,
        private session: SessionService,
        private translatorService: TranslatorService,
        private designModeService: DesignModeService) {

        this.currentUser = this.session.currentUser();
        this.authService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {
            this.currentUser = this.session.currentUser();
            this.verifyHomepage();
        });
        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
            this.currentUser = this.session.currentUser();
            this.verifyHomepage();
        });
        this.$rootScope.$on("$stateChangeSuccess", (event: ng.IAngularEvent, toState: ng.ui.IState) => {
            this.verifyHomepage();
        });
        this.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            this.designMode = designModeOn;
            this.$scope.$apply();
        });
    }

    ngOnInit() {
        this.verifyHomepage();
        this.designMode = this.designModeService.isInDesignMode();
    }

    canDisplay() {
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
}
