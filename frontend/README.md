# React/Sass/Redux Boilerplate

## Summary
npm is used to install pre-packaged javascript modules. Webpack is then used to bundle all dependencies in your React application to create static assets. Then, our transpiled React application can be run with a npm command.


## Getting Started

To get started, first install all the necessary dependencies.
```
> npm install
```

Run an initial webpack build
```
> webpack
```

Start the development server (changes will now update live in browser)
```
> npm run start
```

To view your project, go to: [http://localhost:3000/](http://localhost:3000/)

## Notes
* When you add a dependency in the React application, update package.json. You will need to re-run npm install to update your local npm module library.
* Keep in mind our React application is following Redux architecture.


# React/Sass/Redux architecture outline

![](http://i.imgur.com/DUiL9yn.png)
