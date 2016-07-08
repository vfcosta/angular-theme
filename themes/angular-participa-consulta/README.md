# Angular Participa Consulta Theme


## Getting started

**1. To use with `npm start` command**
> **PS:** To developer mode

Run these commands to set the proper theme and skin

`npm config set angular-theme:theme angular-participa-consulta`

`npm config set angular-theme:skin skin-yellow`

**2. To generate a build**
> **PS:** Deploy to production

* Create a specific `package.json` file into this directory
> Use the **`npm init`** command to create this file

* Configure the **main** skin to this theme. Add the property `config['skin']` below:

```json
"config": {
  "skin": "skin-yellow"
}
```
