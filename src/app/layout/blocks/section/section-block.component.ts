import {Component, Inject, Input} from "ng-forward";

@Component({
    selector: "noosfero-section-block-plugin-section-block",
    templateUrl: "app/layout/blocks/section/section-block.html"
})
export class SectionBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    name: string;
    description: string;
    font_color: string;
    background_color: string;

    ngOnInit() {
        if (this.block && this.block.settings) {
            this.name = this.block.settings.name.trim();
            this.description = this.block.settings.description.trim();
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
