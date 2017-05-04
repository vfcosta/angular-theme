import {Component, Inject, Input} from "@angular/core";
import {PersonService} from "./../../../../lib/ng-noosfero-api/http/person.service";
import {Arrays} from "./../../../../lib/util/arrays";

@Component({
    selector: "noosfero-interest-tags-block",
    template: require('plugins/person_tags/blocks/person-tags-plugin-interests/person-tags-plugin-interests-block.html')
})
export class PersonTagsPluginInterestsBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: any;
    tags: any;

    constructor(@Inject("personService") private personService: PersonService) { }

    ngOnInit() {
        this.profile = this.owner;
        this.tags = [];
        this.personService.getTags(this.owner).then((result: noosfero.RestResult<any>) => {
            this.tags = result.data;
        });
    }
}