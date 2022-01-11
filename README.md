# Messenger app

This is a messenger app written for Yandex practicum [middle FE course](https://practicum.yandex.ru/profile/middle-frontend/).
You can find a publish version [here]()

## Design
Project design can be found in [Figma](https://www.figma.com/file/EuBlJHo8hEbs4qs7NQc64c/Chat-Galina)

## Technology 
- [Parcel](https://parceljs.org/), as a build tool
- [Scss](https://sass-lang.com/) as a stylesheet language
- [Handlebars](https://handlebarsjs.com/), as a templating language
- [Express](https://expressjs.com/) for NodeJS, as a web server for serving static files.
- [Netlify](https://app.netlify.com/) for publishing

## Installation

#### Build static files
To build static files, using Parcel, use the following command
```
npm run build
```
This will create a new folder `dist` with all static files.

#### Run a web server
To run a web server locally use the following command: 
```
npm run start
```
This will run a web server on the 3000 port locally.
Type in your browser http://localhost:3000 and you will see a login page

## 