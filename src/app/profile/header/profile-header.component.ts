import { Inject, Input, Output, Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DesignModeService } from './../../shared/services/design-mode.service';

@Component({
    selector: "noosfero-profile-header",
    templateUrl: './profile-header.html',
    styleUrls: ['./profile-header.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileHeaderComponent implements OnInit {

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
