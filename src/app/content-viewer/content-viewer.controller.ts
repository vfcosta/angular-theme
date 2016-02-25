import {ArticleDirective, ArticleView} from "../components/noosfero-articles/article/article.directive";

/** @ngInject */
export function ContentViewerController(noosfero, $log, $stateParams) {
    var vm = this;
    vm.article = null;
    vm.profile = null;
    activate();

    function activate() {
        noosfero.currentProfile.then(function(profile) {
            vm.profile = profile;
            return noosfero.profiles.one(vm.profile.id).one('articles').get({ path: $stateParams.page });
        }).then(function(response) {
            vm.article = response.data.article;
        });
    }
}
