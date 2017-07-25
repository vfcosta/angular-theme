import { Input, Inject, Component } from '@angular/core';

@Component({
    selector: 'noosfero-block-settings',
    templateUrl: './block-settings.html'
})
export class BlockSettingsComponent {

    @Input() block: any;
    @Input() owner: any;
}
