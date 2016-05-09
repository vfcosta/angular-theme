import {Directive, Inject} from "ng-forward";

@Directive({
    selector: '[macro]',
    providers: []
})
@Inject('$element', '$scope', '$compile')
export class MacroDirective {

    private macroPrefix = "data-macro";

    constructor(private $element: any, private $scope: ng.IScope, private $compile: ng.ICompileService) {
        let macro = $element[0].attributes[this.macroPrefix].value;
        let componentName = this.normalizeName(macro);
        let content = $element.html().replace(/"/g, '&quot;');
        let customAttributes = this.extractCustomAttributes($element[0].attributes);
        $element.replaceWith($compile(`<${componentName} [article]="ctrl.article" content="${content}" ${customAttributes}></${componentName}>`)($scope));
    }

    extractCustomAttributes(attributes: any) {
        let customAttributes = "";
        for (let attr of attributes) {
            if (attr.name.startsWith(this.macroPrefix + '-')) {
                let name = this.normalizeName(attr.name.replace(this.macroPrefix + '-', ''));
                customAttributes += ` ${name}='${attr.value}'`;
            }
        }
        return customAttributes;
    }

    normalizeName(name: string) {
        return name.replace(/[_\/]/g, '-').toLowerCase();
    }
}
