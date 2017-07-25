import * as commentParagraph from './comment_paragraph/languages';
export let languages = {};

const enabledPlugins = [
    commentParagraph,
];
enabledPlugins.forEach((plugin: any) => {
    if (plugin.languages) {
        languages = Object.assign(languages, plugin.languages);
    }
});
