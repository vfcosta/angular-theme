import { SessionService } from './../../login/session.service';
import { Component, Inject } from '@angular/core';
import { AuthService } from "./../../login";

@Component({
    selector: "noosfero-footer",
    template: require("app/layout/footer/footer.html")
})
export class FooterComponent {

    private currentUser: noosfero.User;

    constructor(@Inject('authService') private authService: AuthService,
        private session: SessionService,
        @Inject('$state') private $state: ng.ui.IStateService) {
      this.currentUser = this.session.currentUser();
    }

    logout() {
        this.authService.logout();
        this.$state.go(this.$state.current, {}, { reload: true });
    };

}
