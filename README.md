# Angular Theme

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
1. Install [Bower](http://bower.io/): `npm install -g bower`
1. Install [Gulp](http://gulpjs.com/): `npm install -g gulp`
1. Install Node.js dependencies: `npm install`
1. Install bower dependencies: `bower install`
1. Build the project: `npm run build`
1. Build multiple themes: `npm run build-all`
1. Run project tests: `npm run test`

### How to Use

Copy the desired theme from the `dist` folder into
noosfero `public/design/themes`.

## Project Structure
The folder structure of this project was sorted by feature.
See some important folders bellow:

- Directives for blocks: `src/app/layout/blocks`
- Directives for articles: `src/app/article`
- Directives for activities: `src/app/profile/activities`
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

- Create an any scss file into: `app/layout/skins/`
  > **Suggestion:** Create a `sass` file partial. Something like: **`_mycustom.scss`**.
  
- Extend your skin css class from `%skin-base` scss placeholder selector. Something like this:
  > **Suggestion:** Use the prefix **`skin-`** to the css class

```sass
.skin-custom {
  @extend %skin-base
}
```
- Configure application to use the new theme, e.g.:
`npm config set angular-theme:skin skin-mycustom`

- Start the application with `npm start` scripts or make a build
  > **PS:** If the configured skin is invalid, an error message is showed in the terminal.

## Development environment

## Known Issues

### Message Translation: angular-i18n

 - Plural  Interpolation only working when current language is En (English)

 `Plural Function not found for locale`

 For some reason the messageformat installed on bower_component directory was an older version. Removing the bower_components directory
and runing `bower install` solved the problem
