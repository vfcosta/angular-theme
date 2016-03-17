
/**
 * @ngdoc service
 * @name NoosferoApp
 * @description
 *  The main NoosferoApp module class. It provide helper static methods used by
 * the module to initialize the application.
 */
export class NoosferoApp {

    /**
     * @ngdoc property
     * @name appName
     * @propertyOf NoosferoApp
     * @returns {string} the name of this application ('noosferoApp')
     */
    static appName: string = "noosferoApp";
    
    /**
     * @ngdoc property
     * @name angularModule
     * @propertyOf NoosferoApp
     * @returns {any} all the modules installed for this application
     */    
    static angularModule: any;

    /**
     * @ngdoc method
     * @name addConfig
     * @methodOf NoosferoApp
     * @param {Function} configFunc the configuration function to add  
     * @descprition adds a configuration function to 
     *  the {@link NoosferoApp#angularModule}
     */
    static addConfig(configFunc: Function) {
        NoosferoApp.angularModule.config(configFunc);
    }

    /**
     * @ngdoc method
     * @name addConstants
     * @methodOf NoosferoApp
     * @param {string} constantName the constant name
     * @param {any} value the constant value
     * @description adds a constant to the {@link NoosferoApp#angularModule}
     */
    static addConstants(constantName: string, value: any) {
        NoosferoApp.angularModule.constant(constantName, value);
    }

    /**
     * @ngdoc method
     * @name addService
     * @methodOf NoosferoApp
     * @param {string} serviceName the service name
     * @param {any} value the service value
     * @description adds a service to the {@link NoosferoApp#angularModule}
     */
    static addService(serviceName: string, value: any) {
        NoosferoApp.angularModule.service(serviceName, value);
    }

    /**
     * @ngdoc method
     * @name addFactory
     * @methodOf NoosferoApp
     * @param {string} factoryName the factory name
     * @param {any} value the factory value
     * @description adds a factory to the {@link NoosferoApp#angularModule}
     */
    static addFactory(factoryName: string, value: any) {
        NoosferoApp.angularModule.factory(factoryName, value);
    }

    /**
     * @ngdoc method
     * @name addController
     * @methodOf NoosferoApp
     * @param {string} controllerName the controller name
     * @param {any} value the controller value
     * @description adds a controller to the {@link NoosferoApp#angularModule}
     */
    static addController(controllerName: string, value: any) {
        NoosferoApp.angularModule.controller(controllerName, value);
    }

    /**
     * @ngdoc method
     * @name run
     * @methodOf NoosferoApp
     * @param {Function} runFunction the function to execute
     * @description runs a function using the {@link NoosferoApp#angularModule}
     */
    static run(runFunction: Function) {
        NoosferoApp.angularModule.run(runFunction);
    }
}
