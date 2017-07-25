import { Component, Input, ViewEncapsulation } from '@angular/core';

export const DisplayStyles = {
    avatar: 'avatar',
    card: 'card'
};

@Component({
    selector: 'profile-list',
    templateUrl: './profile-list.component.html',
    styleUrls: ['./profile-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileListComponent {
    @Input() profiles: noosfero.Profile[];
    @Input() owner: noosfero.Profile;
    @Input() displayStyle: string;

    constructor() {
        this.displayStyle = DisplayStyles.avatar;
    }

    isCurrentStyle(style: string) {
        return (style === this.displayStyle);
    }

    displayName() {
        return this.isCurrentStyle('card');
    }
}
