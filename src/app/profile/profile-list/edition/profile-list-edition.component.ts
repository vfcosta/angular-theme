import { RoleService } from './../../../../lib/ng-noosfero-api/http/role.service';
import { Component, Input, Inject, ElementRef, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import * as _ from "lodash";

@Component({
    selector: 'profile-list-edition',
    templateUrl: './profile-list-edition.component.html',
    styleUrls: ['./profile-list-edition.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileListEditionComponent {

    @Input() profile: noosfero.Profile;
    @Input() owner: noosfero.Profile;
    @ViewChild("popover") popover;

    roles: noosfero.Role[];

    constructor(private elementRef: ElementRef,
        private roleService: RoleService,
        private notificationService: NotificationService) { }

    loadRoles() {
        this.roleService.getByProfile(this.owner.id, { person_id: this.profile.id }).then(
            (result: noosfero.RestResult<noosfero.Role[]>) => {
                this.roles = result.data;
            }
        );
    }

    save() {
        const roleIds = _.map(_.filter(this.roles, 'assigned'), 'id');
        const removeRoleIds = _.map(_.filter(this.roles, ['assigned', false]), 'id');
        this.roleService.assign(this.owner.id, this.profile.id, roleIds, removeRoleIds).then((result: noosfero.RestResult<noosfero.Role[]>) => {
            this.notificationService.success({ title: "profile-list-edition.role.success.title", message: "profile-list-edition.role.success.message" });
            this.hidePopover();
        });
    }

    hidePopover() {
        if (this.popover) this.popover.hide();
    }

    ownerIsCommunity() {
        return this.owner && this.owner.type === "Community";
    }

    @HostListener('document:click', ['$event'])
    onClick($event: any) {
        if (!this.elementRef.nativeElement.contains($event.target)) {
            this.hidePopover();
        }
    }
}
