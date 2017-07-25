# Angular Theme

[![build status](https://gitlab.com/noosfero-themes/angular-theme/badges/master/build.svg)](https://gitlab.com/noosfero-themes/angular-theme/commits/master)
[![coverage report](https://gitlab.com/noosfero-themes/angular-theme/badges/master/coverage.svg)](https://gitlab.com/noosfero-themes/angular-theme/commits/master)

The Noosfero theme that uses the API to create a totally new client-side frontend.

## Getting started

### If you use Vagrant
Use our [VirtualBox](https://atlas.hashicorp.com/paulohtfs/boxes/noosfero-dev) with everything setup.
Run:
```
vagrant up
vagrant ssh
```
This box provides Noosfero and the Angular base theme repositories.
We've also set up vim and tmux to make the work easier.

### How to Install
1. Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
1. Install Node.js dependencies: `npm install`
1. Build the project: `npm run build`
1. Build multiple themes: `npm run build-all`
1. Run project tests: `npm run test`

### How to Use

Copy the desired theme from the `dist` folder into
noosfero `public/design/themes`.

## Project Structure
The folder structure of this project was sorted by feature.
See some important folders bellow:

- Components for blocks: `src/app/layout/blocks`
- Components for articles: `src/app/article`
- Components for activities: `src/app/profile/activities`
- Service to connect with Noosfero API: `src/lib/ng-noosfero-api`
- Content viewer component: `src/app/article/content-viewer`
- Profile component: `src/app/profile`
- Profile Info component: `src/app/profile/info`


## Change theme

1. Create the theme folder inside themes
1. Configure application to use the new theme, e.g.:
`npm config set angular-theme:theme custom-theme`
1. Create an app folder inside custom-theme and add your custom scss files
1. Put the templates that you want to override in the same structure from the main application source, e.g.:
`src/app/profile/profile.html` will be overriden by `themes/custom-theme/app/profile/profile.html`

## Change skin

- Create an any scss file into: `app/layout/scss/skins/`
  > **Suggestion:** Create a `sass` file partial. Something like: **`_mycustom.scss`**.

- Extend your skin css class from `%skin-base` scss placeholder selector. Something like this:
  > **Suggestion:** Use the prefix **`skin-`** to the css class

```sass
.skin-mycustom {
  @extend %skin-base
}
```
- Configure application to use the new theme, e.g.:
`npm config set angular-theme:skin skin-mycustom`
OR add the default skin property to a specific `package.json` file (ONLY PERFORM A BUILD), like this:

```json
"config": {
  "skin": "skin-yellow"
}
```


**N.B.**

1. The full name of the scss class should be used as the parameter for the command `npm config set angular-theme:`, like in _skin-mycustom_. DO NOT use the file name of the skin as the parameter.

2. The skin's file should be the named as the scss class without the word `skin`, preceded by an underline. Otherwise, it will raise an error during `npm install`.

Example: _mycustom.


- Start the application with `npm start` scripts or make a build
  > **PS:** If the configured skin is invalid, an error message is showed in the terminal.

## Development environment

## Known Issues

### Error watching files during npm serve

if you bump into this message: 

`
[15:10:04] 'watch' errored after 11 ms
[1] [15:10:04] Error: watch /home/jonhdoe/p/angular-theme/src/ ENOSPC
[1]     at exports._errnoException (util.js:1026:11)
`

run:
    
    echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p