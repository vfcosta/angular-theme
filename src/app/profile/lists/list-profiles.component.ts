import {Component, Input} from '@angular/core';

@Component({
    selector: 'list-profiles',
    template: require("app/profile/lists/list-profiles.component.html")
})
export class ListProfilesComponent {
    @Input() profiles: noosfero.Profile[];
}
