# Messenger app

PR Sprint 3 https://github.com/galina-niukhalova/middle.messenger.praktikum.yandex/pull/3

This is a messenger app written for Yandex practicum [middle FE course](https://practicum.yandex.ru/profile/middle-frontend/).

Live version is published [here](https://galina-messenger.netlify.app).

## Functionality
A user can visit the following pages:
- [Login page](https://galina-messenger.netlify.app/)
- [Signup page](https://galina-messenger.netlify.app/signup)
- [User profile](https://galina-messenger.netlify.app/profile)
- [5xx](https://galina-messenger.netlify.app/error)
- [404](https://galina-messenger.netlify.app/random)
- [chats](https://galina-messenger.netlify.app/chats)

## Design
Project design can be found in [Figma](https://www.figma.com/file/EuBlJHo8hEbs4qs7NQc64c/Chat-Galina).

## Technology 
- [Parcel](https://parceljs.org/), as a build tool
- [Scss](https://sass-lang.com/), as a stylesheet language
- [Handlebars](https://handlebarsjs.com/), as a templating language
- [Express](https://expressjs.com/) for NodeJS, as a web server for serving static files.
- [Netlify](https://app.netlify.com/) for publishing

## Installation
#### 1. Install dependencies
```
npm install
```

#### 2. Build static files
To build static files, using Parcel, use the following command
```
npm run build
```
This will create a new folder `dist` with all static files.

#### 3. Run a web server
To run a web server locally use the following command: 
```
npm run start
```
This command will run a web server locally on port 3000.

To check it out, open http://localhost:3000 in your browser.
You should see a login page for non authorized users.
