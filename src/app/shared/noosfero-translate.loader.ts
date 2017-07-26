import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import * as pt from '../../languages/pt';
import * as en from '../../languages/en';
import * as pluginLanguages from '../../plugins/languages';

export class NoosferoTranslateLoader implements TranslateLoader {

    public getTranslation(lang: string): any {
        if (lang === 'en') {
            return Observable.of(Object.assign(en.translation, pluginLanguages.languages[lang]));
        } else if (lang === 'pt') {
            return Observable.of(Object.assign(pt.translation, pluginLanguages.languages[lang]));
        }
    }
}
