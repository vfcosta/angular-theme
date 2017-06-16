import { SessionService } from './../../../login/session.service.ng2';
import { ViewChild } from '@angular/core';
import { ProfileService } from './../../../../lib/ng-noosfero-api/http/profile.service.ng2';
import { TranslatorService } from './../../../shared/services/translator.service';
import { NotificationService } from './../../../shared/services/notification.service';
import { CommunityService } from './../../../../lib/ng-noosfero-api/http/community.service';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { Component, Input, Output, Inject, EventEmitter } from '@angular/core';
import { ValidationMessageComponent } from '../../../shared/components/validation-message/validation-message.component';

export abstract class AbstractFormCommunity {
    @Input() public profile: noosfero.Profile;
    public community: noosfero.Community;
    @Output() public finished = new EventEmitter<noosfero.Community>();
    @ViewChild('nameErrors') nameErrors: ValidationMessageComponent;

    public errors: any;
    public acceptBefore: boolean = true;
    public sessionProfile: noosfero.Profile;

    constructor(@Inject("notificationService") public notificationService: NotificationService,
        @Inject(CommunityService) public communityService: CommunityService,
        @Inject(ProfileService) public profileService: ProfileService,
        @Inject(SessionService) public sessionService: SessionService,
        @Inject('$state') public $state: ng.ui.IStateService,
        @Inject('translatorService') public translatorService: TranslatorService) {}

    abstract getTitle();
    abstract save();
    abstract cancel();

    onSelectionChange(entry) {
        this.community.closed = entry;
    }

}