import {Component, Input} from '@angular/core';

@Component({
    selector: 'profile-list',
    template: require("app/profile/profile-list/profile-list.component.html")
})
export class ProfileListComponent {
    @Input() profiles: noosfero.Profile[];
    @Input() owner: noosfero.Profile;
    @Input() displayStyle: string;

    constructor() {
        this.displayStyle = 'avatar';
    }

    isCurrentStyle(style: string) {
        return (style === this.displayStyle);
    }
}
