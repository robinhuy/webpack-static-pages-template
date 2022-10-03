# Webpack Static Pages Template

Optimizing static website with webpack 5

## Template features

Run development server in localhost with Hot reload.

Build code for production:
  - Bundle code (multiple pages).
  - Minify HTML + CSS, Minify + Obfuscate JS.
  - Auto inject CSS to end of `<head>` tag and JS to end of `<body>` tag. 
  - Rename CSS + JS file by hash content to Cache Busting.
  - Compress images.

## Install

NPM: `npm install`

Yarn: `yarn install`

## Run development server

NPM: `npm start`

Yarn: `yarn start`

Source code for development inside `src` folder (can be changed in config).

## Build production

NPM: `npm run build`

Yarn: `yarn build`

Code built for production inside `dist` folder (can be changed in config).

## Setup

Config entry-points in `webpack.common.js`.

Default project structure:

![Project Structure](https://user-images.githubusercontent.com/12640832/193526592-3554dfd5-414b-4327-afa2-c9c7a6162b00.png)


