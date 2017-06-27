import {Component, Input} from '@angular/core';

@Component({
    selector: 'noosfero-main-block',
    template: require('app/layout/blocks/main/main-block.html')
})
export class MainBlockComponent {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

}
