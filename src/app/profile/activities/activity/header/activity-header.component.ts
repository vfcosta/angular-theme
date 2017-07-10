import {Component, Input, Inject} from '@angular/core';

@Component({
    selector: "noosfero-activity-header",
    templateUrl: './activity_header.html'
})
export class ActivityHeaderComponent {

    @Input() activity: noosfero.Activity;
    @Input() desc: any;
    @Input() profiles: any;
    @Input() iconalt: any;
    @Input() iconclass: any;

    getDesc() {
        return (this.profiles && this.profiles > 1) ? this.desc + ".plural" : this.desc; 
    }
    count() {
        return this.profiles ? this.profiles : 1;
    }
}