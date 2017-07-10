import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: "profile-edition",
    templateUrl: './profile-edition.html'
})
export class ProfileEditionComponent {

    profile: noosfero.Profile;

    constructor(private route: ActivatedRoute) {
        this.profile = route.snapshot.data["profile"];
    }

    isPerson() {
        return this.profile.type === "Person";
    }

    isCommunity() {
        return this.profile.type === "Community";
    }
}