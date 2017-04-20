import { ProfileImageComponent } from "./../../../profile/image/profile-image.component";
import { Component, Inject, Input } from '@angular/core';

@Component({
    selector: "noosfero-profile-image-block",
    template: require('app/layout/blocks/profile-image/profile-image-block.html')

})
export class ProfileImageBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

}
