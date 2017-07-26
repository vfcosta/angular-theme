import {Component, Input} from '@angular/core';

@Component({
    selector: 'noosfero-main-block',
    templateUrl: './main-block.html'
})
export class MainBlockComponent {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

}
