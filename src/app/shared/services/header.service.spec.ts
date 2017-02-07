import * as helpers from '../../../spec/helpers';
import { HeaderService } from "./header.service";

describe("Header Service", () => {
    let environmentService = jasmine.createSpyObj("EnvironmentService", ["getCurrentEnvironment"]);
    environmentService.getCurrentEnvironment = jasmine.createSpy("getCurrentEnvironment").and.returnValue(helpers.mocks.promiseResultTemplate({ id: 1, name: 'Noosfero' }));

    let $rootScope: ng.IRootScopeService = <any>{};
    let $document: ng.IDocumentService = <any>{};
    let createComponent = (): HeaderService => {
        return new HeaderService($rootScope, $document, environmentService);
    };

    it("should set the header title element", () => {
        let component: HeaderService = createComponent();

        let titleElJq = jasmine.createSpyObj("titleElement", ["text"]);
        titleElJq.text = jasmine.createSpy("text");
        component["titleElement"] = titleElJq;
        component.setEnvironmentTitle();

        expect(titleElJq.text).toHaveBeenCalledWith('Noosfero');
    });

});
