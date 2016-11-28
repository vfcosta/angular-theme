import { Inject, Input, Component } from 'ng-forward';
import { BoxesComponent } from '../boxes/boxes.component';
import { ProfileService } from '../../../lib/ng-noosfero-api/http/profile.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
    selector: "layout-config",
    templateUrl: "app/layout/layout-config/layout-config.html"
})
@Inject(ProfileService, NotificationService)
export class LayoutConfigComponent {

    @Input() owner: noosfero.Profile | noosfero.Environment;

    originalLayout: string;

    constructor(private profileService: ProfileService, private notificationService: NotificationService) { }

    ngOnInit() {
        this.originalLayout = this.owner.layout_template;
    }

    changeLayout(layout: string) {
        this.owner.layout_template = layout;
    }

    apply() {
        let profile: any = { id: this.owner.id };
        profile['layout_template'] = this.owner.layout_template;
        this.profileService.update(profile).then(() => {
            this.originalLayout = profile.layout_template;
            this.notificationService.success({ title: "layout-config.apply.success.title", message: "layout-config.apply.success.message" });
        });
    }

    layouts() {
        return BoxesComponent.layouts;
    }

    isSelected(layout: string) {
        return this.owner.layout_template === layout;
    }

    isChanged() {
        return this.originalLayout !== this.owner.layout_template;
    }
}
