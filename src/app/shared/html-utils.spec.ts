import {
HtmlUtils
} from "./html-utils";

describe("HtmlUtils", () => {
    let element: ng.IAugmentedJQuery;

    beforeEach(inject(($compile: ng.ICompileService, $rootScope: ng.IRootScopeService) => {
        element = $compile("<a></a>")($rootScope);
    }));

    it("removes a css class matching some prefix from an HTML Element", () => {
        element.addClass("noosfero-class1");
        element.addClass("noosfero-class2");
        element.addClass("another-class");

        HtmlUtils.removeCssClassByPrefix(element[0], "noosfero-");

        // we expect classes prefixed with 'noosfero-' to be removed 
        expect(element[0].classList).not.toContain("noosfero-class1");
        expect(element[0].classList).not.toContain("noosfero-class2");

        // class not prefixed with 'noosfero-' should be there
        expect(element[0].classList).toContain("another-class");
    });

    it("removes a css class matching some suffix from an HTML Element", () => {
        element.addClass("class-1-noosfero");
        element.addClass("class-2-noosfero");
        element.addClass("another-class");

        HtmlUtils.removeCssClassBySuffix(element[0], "-noosfero");

        // we expect classes prefixed with 'noosfero-' to be removed 
        expect(element[0].classList).not.toContain("class-1-noosfero");
        expect(element[0].classList).not.toContain("class-2-noosfero");

        // class not suffixed with '-noosfero' should be there
        expect(element[0].classList).toContain("another-class");
    });
});