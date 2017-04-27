// import { Component, Inject, Input, provide } from 'ng-forward';
// import { ArticleService } from "../../../lib/ng-noosfero-api/http/article.service";
// import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";
// import { PersonService } from './../../../../lib/ng-noosfero-api/http/person.service';
import { Component, Input, Inject } from '@angular/core';
// import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'noosfero-community-members-my-profile',
    template: require('app/profile/configuration/communities/community-members-my-profile.html')
})
export class CommunityMembersMyProfileComponent {
    @Input() profile: noosfero.Profile;

    constructor() {
        console.log('construindo a aplicaçãoaaaaaaaaaaaaaaaaaaaaa');
    }

}
