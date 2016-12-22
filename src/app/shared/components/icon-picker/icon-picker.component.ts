import { Component, Input } from "ng-forward";

@Component({
    selector: "noosfero-icon-picker",
    templateUrl: "app/shared/components/icon-picker/icon-picker.html"
})
export class IconPickerComponent {

    @Input() currentIcon: string;

    availableIcons = ['', 'fa-edit', 'fa-file-o', 'fa-download', 'fa-mail-reply', 'fa-remove', 'fa-plus',
        'fa-arrow-circle-up', 'fa-arrow-circle-down', 'fa-arrow-circle-left', 'fa-arrow-circle-right',
        'fa-search', 'fa-play', 'fa-question', 'fa-question-circle', 'fa-video-camera', 'fa-camera',
        'fa-user', 'fa-users', 'fa-calendar', 'fa-inbox', 'fa-comments', 'fa-cog',
        'fa-clone', 'fa-envelope', 'fa-file-image-o', 'fa-coffee', 'fa-bell'];

    changeIcon(icon: string) {
        this.currentIcon = icon;
    }
}
