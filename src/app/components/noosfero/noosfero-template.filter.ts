import {Pipe} from "ng-forward";

@Pipe("noosferoTemplate")
export class NoosferoTemplate {

    transform(text: string, options: any) {
        for (let option in options) {
            text = text.replace('{' + option + '}', options[option]);
        }
        return text;
    }

}
