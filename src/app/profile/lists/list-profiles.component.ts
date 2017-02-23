import {Component, Input} from '@angular/core';

@Component({
    selector: 'profile-list',
    template: require("app/profile/lists/list-profiles.component.html")
})
export class ListProfilesComponent {
    @Input() profiles: noosfero.Profile[];
}
