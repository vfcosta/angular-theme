import { Component, Input, Inject } from '@angular/core';

@Component({
    selector: 'custom-content',
    template: require("app/profile/custom-content/custom-content.html"),
})
export class CustomContentComponent {

    @Input() attribute: string;
    @Input() profile: noosfero.Profile;
    @Input() label: string;

    content() {
        return this.profile[this.attribute];
    }
}
