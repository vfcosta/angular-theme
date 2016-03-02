module NgNoosferoAPI {
    

    // The following class represents the provider
    export class NoosferoHttpServiceConfigProvider implements ng.IServiceProvider {
        private config = <NoosferoHttpServiceConfig>{
            hostname: "localhost",
            protocol: "http",
            port: 3000,
            apiPath: "/api/v1",
            acceptHeader: "application/json",
            contentTypeHeader: "application/json",
            textEncoding: "UTF-8"
        };
    
 
        // Configuration function
        public setConfig(config: NoosferoHttpServiceConfig) {
            this.config = config;
        }
 
        // Provider's factory function
        public $get(): NoosferoHttpServiceConfig {
            return this.config;
        }
    }
    
    ngModule.provider("NoosferoHttpServiceConfig", NoosferoHttpServiceConfigProvider);

}