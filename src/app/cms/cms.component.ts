import {StateConfig, Component, Inject} from 'ng-forward';

@Component({
    selector: 'cms',
    templateUrl: "app/cms/cms.html"
})
@Inject("noosfero", "$stateParams", "$httpParamSerializer", "$state", "SweetAlert")
export class Cms {

    article: any = {};
    profile: any;

    constructor(private noosfero, private $stateParams, private $httpParamSerializer, private $state, private SweetAlert) {

    }

    save() {
        this.noosfero.currentProfile.then((profile) => {
            return this.noosfero.profiles.one(profile.id).customPOST(
                { article: this.article },
                'articles',
                {},
                { 'Content-Type': 'application/json' }
            )
        }).then((response) => {
            this.$state.transitionTo('main.profile.page', { page: response.data.article.path, profile: response.data.article.profile.identifier });
            this.SweetAlert.swal({
                title: "Good job!",
                text: "Article saved!",
                type: "success",
                timer: 1000
            });
        });
    }

}
