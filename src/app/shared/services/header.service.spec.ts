import * as helpers from '../../../spec/helpers';
import { HeaderService } from "./header.service";

describe("Header Service", () => {

    let headerService: HeaderService;
    let $rootScope: ng.IRootScopeService = <any>{},
        $document: ng.IDocumentService = <any>{},
        $environmentService: any = helpers.mocks.environmentService,
        titleElJq: any;

    let getService = (): HeaderService => {
        return new HeaderService($rootScope, $document, $environmentService);
    };

    beforeEach(() => {
        $environmentService.getCurrentEnvironment = jasmine.createSpy("getCurrentEnvironment").and.returnValue({
            name: 'Page Title'
        });
        titleElJq = jasmine.createSpyObj("titleElement", ["text"]);
    });

    it("should set the header title element", () => {
        let service = getService();

        titleElJq.text = jasmine.createSpy("text");
        service["titleElement"] = titleElJq;

        service.setEnvironmentTitle();

        expect(titleElJq.text).toHaveBeenCalledWith('Page Title');
    });

});