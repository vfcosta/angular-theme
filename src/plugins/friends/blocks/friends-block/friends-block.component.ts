import { PersonService } from './../../../../lib/ng-noosfero-api/http/person.service';
import { Component, Inject, Input } from "ng-forward";

@Component({
    selector: "noosfero-friends-block",
    templateUrl: "plugins/friends/blocks/friends-block/friends-block.html"
})
@Inject(PersonService)
export class FriendsBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    profiles: any = [];

    constructor(private personService: PersonService) { }

    ngOnInit() {
        let limit: number = ((this.block && this.block.settings) ? this.block.settings.limit : null) || 4;
        this.personService.getFriends(this.owner.id, { limit: limit }).then((result: noosfero.RestResult<noosfero.Person[]>) => {
            this.profiles = result.data;
            console.log("### Profiles ==", result.data);
        });
    }
}
