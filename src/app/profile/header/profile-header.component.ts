import { Inject, Input, Output, Component } from "@angular/core";
import { DesignModeService } from './../../shared/services/design-mode.service';

@Component({
    selector: "noosfero-profile-header",
    template: require('app/profile/header/profile-header.html')
})
export class ProfileHeaderComponent {

    @Input() profile: noosfero.Profile;
    designMode = false;

    constructor(public designModeService: DesignModeService) { }
     ngOnInit() {
        this.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            this.designMode = designModeOn;
        });
        this.designMode = this.designModeService.isInDesignMode();
    }

    profileBackground() {
        if (!this.profile || !this.profile.top_image) return null;
        return `url("${this.profile.top_image.url}")`;
    }

}
