import {Component, Inject, Input} from "ng-forward";
import {PersonService} from "./../../../../lib/ng-noosfero-api/http/person.service";
import {Arrays} from "./../../../../lib/util/arrays";

@Component({
    selector: "noosfero-person-tags-plugin-interests-block",
    templateUrl: 'app/layout/blocks/person-tags-plugin-interests/person-tags-plugin-interests-block.html'
})
@Inject(PersonService, "$state")
export class PersonTagsPluginInterestsBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: any;
    tags: any;

    constructor(private personService: PersonService, private $state: any) { }

    ngOnInit() {
        this.profile = this.owner;
        this.tags = [];
        this.personService.getTags(this.owner).then((result: noosfero.RestResult<any>) => {
            this.tags = result.data;
        });
    }
}
