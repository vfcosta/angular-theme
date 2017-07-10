import { Component, Input, Inject } from '@angular/core';

@Component({
    selector: 'custom-content',
    templateUrl: './custom-content.html',
    styleUrls: ['./custom-content.scss']
})
export class CustomContentComponent {

    @Input() attribute: string;
    @Input() profile: noosfero.Profile;
    @Input() label: string;

    content() {
        return this.profile[this.attribute];
    }
}
