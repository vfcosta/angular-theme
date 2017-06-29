import { Component, Inject, Input } from '@angular/core';
import { DesignModeService } from '../../shared/services/design-mode.service';

@Component({
    selector: "config-bar",
    template: require("app/layout/config-bar/config-bar.html")
})
export class ConfigBarComponent {

    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Input() permissionAction = "allow_edit";

    designModeOn = false;

    constructor(public designModeService: DesignModeService) {
        this.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            this.designModeOn = designModeOn;
        });
        this.designModeOn = this.designModeService.isInDesignMode();
    }
}
