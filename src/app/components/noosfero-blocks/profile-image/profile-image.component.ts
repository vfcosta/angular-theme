import {Inject, Input, Component} from "ng-forward";
import {ProfileService} from "./../../../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: "noosfero-profile-image-block",
    templateUrl: 'app/components/noosfero-blocks/profile-image/profile-image.html',
    providers: [ProfileService]
})
@Inject(ProfileService)
export class ProfileImageBlock {

    @Input() block: any;
    @Input() owner: any;
    
    image: any;
    
    constructor(private profileService: ProfileService) {
        
    }
    
    ngOnInit() {
        this.profileService.getActivities(null, {}).then((resp:any) => {
            this.image = resp.data.image;
        })
    }

}
