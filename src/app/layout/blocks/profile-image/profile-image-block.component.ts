import { ProfileImageComponent } from './../../../profile/image/profile-image.component';
import { Component, Inject, Input } from '@angular/core';

@Component({
    selector: "noosfero-profile-image-block",
    templateUrl: './profile-image-block.html',
    styleUrls: ['./profile-image-block.scss']

})
export class ProfileImageBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;
    @Input() designMode: boolean;

}
