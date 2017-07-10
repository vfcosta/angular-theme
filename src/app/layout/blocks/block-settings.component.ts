import { Input, Inject, Component } from '@angular/core';

@Component({
    selector: 'noosfero-block-settings',
    template: require("app/layout/blocks/block-settings.html")
})
export class BlockSettingsComponent {

    @Input() block: any;
    @Input() owner: any;
}
