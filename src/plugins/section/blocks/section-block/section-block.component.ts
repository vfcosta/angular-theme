import { Component, Inject, Input } from "ng-forward";
import { DesignModeService } from "../../../../app/admin/layout-edit/designMode.service";

@Component({
    selector: "noosfero-section-block-plugin-section-block",
    templateUrl: "plugins/section/blocks/section-block/section-block.html"
})
@Inject( "$scope", DesignModeService)
export class SectionBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    font_color: string;
    background_color: string;
    designMode = false;


    constructor(private $scope: ng.IScope, 
    private designModeService: DesignModeService) {

        this.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            this.designMode = designModeOn;
            this.$scope.$apply();
        });

        this.designMode = this.designModeService.isInDesignMode()
    }

    ngOnInit() {
        if (this.block && this.block.settings) {
            this.font_color = this.block.settings.font_color.trim();
            this.background_color = this.block.settings.background_color.trim();
        }
    }

    colors() {
        return (this.color('font', this.font_color) + ' ' + this.color('background', this.background_color));
    }

    color(color_type: string, color_value: string) {
        let css_property = '';

        if (color_type === 'font') {
            css_property = 'color:';
        }
        else {
            if (color_type === 'background') {
                css_property = 'background-color:';
            }
            else {
                return css_property;
            }
        }

        let css_style = '';

        if (color_value !== '') {
            css_style = css_property + ' #' + color_value + ';';
        }
        return css_style;
    }

}
