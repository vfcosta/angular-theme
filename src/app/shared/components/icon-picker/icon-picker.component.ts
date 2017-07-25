import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: "noosfero-icon-picker",
    templateUrl: './icon-picker.html',
    styleUrls: ['./icon-picker.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class IconPickerComponent {

    @Input() currentIcon: string;
    @Output() iconChange = new EventEmitter<any>();

    availableIcons = ['', 'fa-edit', 'fa-file-o', 'fa-download', 'fa-mail-reply', 'fa-remove', 'fa-plus',
        'fa-arrow-circle-up', 'fa-arrow-circle-down', 'fa-arrow-circle-left', 'fa-arrow-circle-right',
        'fa-search', 'fa-play', 'fa-question', 'fa-question-circle', 'fa-video-camera', 'fa-camera',
        'fa-user', 'fa-users', 'fa-calendar', 'fa-inbox', 'fa-comments', 'fa-cog',
        'fa-clone', 'fa-envelope', 'fa-file-image-o', 'fa-coffee', 'fa-bell'];

    changeIcon(icon: string) {
        this.currentIcon = icon;
        this.iconChange.emit(this.currentIcon);
    }
}
