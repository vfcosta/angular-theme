import {Pipe, Inject} from "ng-forward";

@Pipe("translateProfile")
@Inject("translateFilter")
export class TranslateProfile {

    constructor(private translateFilter: any) { }

    transform(profile: noosfero.Profile, options: any) {

        return this.translateFilter("profile." + profile.type.toLowerCase() + ".title");
    }

}
