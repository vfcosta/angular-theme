import { Inject, Input, Component } from 'ng-forward';
import { BoxesComponent } from '../boxes/boxes.component';
import { ProfileService } from '../../../lib/ng-noosfero-api/http/profile.service';
import { EnvironmentService } from '../../../lib/ng-noosfero-api/http/environment.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
    selector: "layout-config",
    templateUrl: "app/layout/layout-config/layout-config.html"
})
@Inject(ProfileService, EnvironmentService, NotificationService)
export class LayoutConfigComponent {

    @Input() owner: noosfero.Profile | noosfero.Environment;

    originalLayout: string;

    constructor(private profileService: ProfileService,
        private environmentService: EnvironmentService,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.originalLayout = this.owner.layout_template;
    }

    changeLayout(layout: string) {
        this.owner.layout_template = layout;
    }

    private callService(obj: noosfero.Profile | noosfero.Environment) {
        let type = (<any>this.owner)['type'];
        let isProfile = type === "Community" || type === "Person";
        if (isProfile) {
            return this.profileService.update(<noosfero.Profile>obj);
        } else {
            return this.environmentService.update(<noosfero.Environment>obj);
        }
    }

    apply() {
        let updated: any = { id: this.owner.id, layout_template: this.owner.layout_template };
        this.callService(updated).then(() => {
            this.originalLayout = updated.layout_template;
            this.notificationService.success({ title: "layout-config.apply.success.title", message: "layout-config.apply.success.message" });
        });
    }

    layouts() {
        return BoxesComponent.layouts;
    }

    isSelected(layout: string) {
        return this.owner && this.owner.layout_template === layout;
    }

    isChanged() {
        return this.owner && this.originalLayout !== this.owner.layout_template;
    }
}
