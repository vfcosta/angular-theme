import { RoleService } from './../../../../lib/ng-noosfero-api/http/role.service';
import { Component, Input, Inject, ElementRef, ViewChild, HostListener } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';

declare var _: any;

@Component({
    selector: 'profile-list-edition',
    template: require("app/profile/profile-list/edition/profile-list-edition.component.html")
})
export class ProfileListEditionComponent {

    @Input() profile: noosfero.Profile;
    @Input() owner: noosfero.Profile;
    @ViewChild("popover") popover;

    roles: noosfero.Role[];

    constructor(private elementRef: ElementRef,
        @Inject('roleService') private roleService: RoleService,
        @Inject('notificationService') private notificationService: NotificationService) { }

    loadRoles() {
        this.roleService.getByProfile(this.owner.id, { person_id: this.profile.id }).then(
            (result: noosfero.RestResult<noosfero.Role[]>) => {
                this.roles = result.data;
            }
        );
    }

    save() {
        let roleIds = _.map(_.filter(this.roles, 'assigned'), 'id');
        let removeRoleIds = _.map(_.filter(this.roles, ['assigned', false]), 'id');
        this.roleService.assign(this.owner.id, this.profile.id, roleIds, removeRoleIds).then((result: noosfero.RestResult<noosfero.Role[]>) => {
            this.notificationService.success({ title: "profile-list-edition.role.success.title", message: "profile-list-edition.role.success.message" });
            this.popover.hide();
        });
    }

    ownerIsCommunity() {
        return this.owner && this.owner.type === "Community";
    }

    @HostListener('document:click', ['$event'])
    onClick($event: any) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.popover.hide();
        }
    }
}
