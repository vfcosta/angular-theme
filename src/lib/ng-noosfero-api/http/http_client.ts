module NgNoosferoAPI {
    export class NoosferoHttpClient {
        static $inject = ['$http', '$q'];

        constructor(private $http, private $q) {

        }
    }

    NgNoosferoAPI.ngModule.service(NoosferoHttpClient);
}

