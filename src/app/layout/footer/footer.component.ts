import { Component, Inject } from "ng-forward";
import { AuthService, SessionService } from "./../../login";

@Component({
    selector: "noosfero-footer",
    templateUrl: "app/layout/footer/footer.html"
})
@Inject(AuthService, SessionService, "$state")
export class FooterComponent {

    private currentUser: noosfero.User;

    constructor(private authService: AuthService, private session: SessionService, private $state: ng.ui.IStateService) {
      this.currentUser = this.session.currentUser();
    }

    logout() {
        this.authService.logout();
        this.$state.go(this.$state.current, {}, { reload: true });
    };

}
