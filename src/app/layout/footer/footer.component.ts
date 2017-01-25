import { Component, Inject } from '@angular/core';
import { AuthService, SessionService } from "./../../login";

@Component({
    selector: "noosfero-footer",
    template: require("app/layout/footer/footer.html")
})
export class FooterComponent {

    private currentUser: noosfero.User;

    constructor(@Inject('authService') private authService: AuthService,
        @Inject('sessionService') private session: SessionService,
        @Inject('$state') private $state: ng.ui.IStateService) {
      this.currentUser = this.session.currentUser();
    }

    logout() {
        this.authService.logout();
        this.$state.go(this.$state.current, {}, { reload: true });
    };

}
