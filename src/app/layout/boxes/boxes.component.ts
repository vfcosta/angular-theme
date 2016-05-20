import {Input, Inject, Component} from 'ng-forward';
import {SessionService, AuthService, AuthEvents} from "../../login";
import {DisplayBlocks} from "./display-blocks.filter";

@Component({
    selector: "noosfero-boxes",
    templateUrl: "app/layout/boxes/boxes.html",
    directives: [DisplayBlocks]
})
@Inject("SessionService", 'AuthService', "$state", "$rootScope")
export class BoxesComponent {

    @Input() boxes: noosfero.Box[];
    @Input() owner: noosfero.Profile | noosfero.Environment;

    currentUser: noosfero.User;
    isHomepage = true;

    constructor(private session: SessionService,
        private authService: AuthService,
        private $state: ng.ui.IStateService,
        private $rootScope: ng.IRootScopeService) {

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
    }

    ngOnInit() {
        this.verifyHomepage();
    }

    boxesOrder(box: noosfero.Box) {
        if (box.position === 2) return 0;
        return box.position;
    }

    private verifyHomepage() {
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
