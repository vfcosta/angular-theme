import { Input, Inject, Component } from '@angular/core';

@Component({
    selector: 'noosfero-block-content',
    template: require("app/layout/blocks/block-content.html")
})
export class BlockContentComponent {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;
}
