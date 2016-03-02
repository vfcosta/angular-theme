import {StateConfig, Component, Inject} from 'ng-forward';
import {Profile} from "./../models/interfaces";
@Component({
    selector: 'cms',
    templateUrl: "app/cms/cms.html"
})
@Inject("noosfero", "$stateParams", "$httpParamSerializer", "$state", "SweetAlert")
export class Cms {

    article: any = {};
    profile: any;

    constructor(private noosfero: any/* TODO convert noosferoService */, private $stateParams: ng.ui.IStateParamsService, private $httpParamSerializer: any, private $state: ng.ui.IStateService, private SweetAlert: any) {

    }

    save() {
        this.noosfero.currentProfile.then((profile: Profile) => {
            return this.noosfero.profiles.one(profile.id).customPOST(
                { article: this.article },
                'articles',
                {},
                { 'Content-Type': 'application/json' }
            )
        }).then((response: restangular.IResponse) => {
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
