import { ProfileImageComponent } from './../../../profile/image/profile-image.component';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: "noosfero-profile-image-block",
    templateUrl: './profile-image-block.html',
    styleUrls: ['./profile-image-block.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class ProfileImageBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;
    @Input() designMode: boolean;

}
