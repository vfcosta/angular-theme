import {Pipe} from "ng-forward";

@Pipe("noosferoTemplate")
export class NoosferoTemplate {

    transform(text: string, options: any) {
        for (var option in options) {
            text = text.replace('{' + option + '}', options[option]);
        }
        return text;
    }

}
