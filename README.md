# Angular Theme

The Noosfero theme that uses the API to create a totally new client-side frontend.

## Getting started

### How to Install
1. Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
1. Install [Bower](http://bower.io/): `npm install -g bower`
1. Install Node.js dependencies: `npm install`
1. Install bower dependencies: `bower install`
1. Build the project: `gulp build`

### How to Use

Just set the profile theme to `angular-theme`.


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
