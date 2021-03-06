import { Component, Inject, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { ProfileService } from '../../../../lib/ng-noosfero-api/http/profile.service';
import { PersonService } from './../../../../lib/ng-noosfero-api/http/person.service';
import { Arrays } from './../../../../lib/util/arrays';

@Component({
    selector: "noosfero-interest-tags-block",
    templateUrl: './person-tags-plugin-interests-block.html',
    styleUrls: ['./person-tags-plugin-interests-block.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PersonTagsPluginInterestsBlockComponent implements OnInit {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

    profile: any;
    tags: any;

    constructor(private profileService: ProfileService) { }

    ngOnInit() {
        this.profile = this.owner;
        this.tags = [];
        this.profileService.getTags(this.owner).then((result: noosfero.RestResult<any>) => {
            this.tags = result.data;
            this.block.hide = (<any>this.tags.length === 0);
        });
    }
}
