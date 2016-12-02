import { Input, Component } from "ng-forward";

@Component({
    selector: "config-bar",
    templateUrl: "app/layout/config-bar/config-bar.html"
})
export class ConfigBarComponent {

    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Input() permissionAction = "allow_edit";
}
