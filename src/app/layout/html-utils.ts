export namespace HtmlUtils {

    /**
     * Remove All Css Classes which matches some prefix
     */
    export function removeCssClassByPrefix(el: HTMLElement, prefix: string) {
        let regx = new RegExp('\\b' + prefix + '\\S*', 'g');
        el.className = el.className.replace(regx, '');
    }

    /**
     * Remove All Css Classes which matches some suffix
     */
    export function removeCssClassBySuffix(el: HTMLElement, suffix: string) {
        let regx = new RegExp('\\S+' + suffix + '\\S*', 'g');
        el.className = el.className.replace(regx, '');
    }
}