import { SessionService } from './../../login/session.service';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { AuthService } from './../../login';

@Component({
    selector: "noosfero-footer",
    templateUrl: './footer.html',
    styleUrls: ['./footer.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {

    private currentUser: noosfero.User;

    constructor(private authService: AuthService, private session: SessionService) {
      this.currentUser = this.session.currentUser();
    }

    logout() {
        this.authService.logout();
    };
}
