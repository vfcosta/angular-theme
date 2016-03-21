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
