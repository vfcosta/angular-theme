import {Input, Inject, Component} from "ng-forward";
import {EnvironmentService} from "../../../../lib/ng-noosfero-api/http/environment.service";

@Component({
    selector: "noosfero-people-block",
    templateUrl: 'app/layout/blocks/people/people-block.html',
})
@Inject(EnvironmentService)
export class PeopleBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Environment;
    private type: string = "people";

    people: noosfero.Person[] = [];

    constructor(private environmentService: EnvironmentService) {
    }

    ngOnInit() {
        this.environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.environmentService.getEnvironmentPeople(environment.id, { limit: '6' }).then((result: noosfero.RestResult<any>) => {
                this.people = result.data;
            });
        });

    }

}
