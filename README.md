# Tetrad Custom Push-Pin Manipulation Tool


## Summary
Our project is to build a module where users can upload their custom images to create push-pin images which can be used to be displayed on Google Map. 


## How to run
Backend and frontend has been decoupled, and they are developed completely separate from one another. They are stored in the backend directory and the frontend directory. README.md is included in each directory which directs how to run them for development purpose. 


## Architecture
1. Back-end
    * Node.js: REST API provider. user verification. interaction with Amazon S3
        * Express.js: web framework for building the REST API
        * AWS SDK: file upload/download redirect to S3 bucket
    * MongoDB: stores image related data specific for each user
    * NGINX: web server
    * Docker: for a stream-lined development process. prevents development environment divergence
    * Mocha: RESTful api testing framework

2. Front-end
    * React.js: single page application library
    * Webpack: module bundler for creating static assets
    * Jest: testing framework


## Notes
* building a REST API
    * what is REST architecture
        * https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm
    * using Express.js
        * http://expressjs.com/
* authentication
    * using Json Web Token (JWT)
        * https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec#.9wmfw3b0c
        * https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
* redirecting user image request to S3
    * using pipe
        * http://stackoverflow.com/questions/17516820/serving-files-stored-in-s3-in-express-nodejs-app
        * http://stackoverflow.com/questions/19883561/showing-an-image-from-amazon-s3-with-nodejs-expressjs-and-knox
* React.js
    * basic tutorial
        * https://www.youtube.com/playlist?list=PL6gx4Cwl9DGBuKtLgPR_zWYnrwv-JllpA
    * Redux tutorial
        * https://www.youtube.com/playlist?list=PL6gx4Cwl9DGBbSLZjvleMwldX8jGgXV6a
* Fabric js
    * saving current Canvas state into JSON
        * http://stackoverflow.com/questions/37328570/how-can-i-make-fabric-js-save-the-state-position-of-each-object-in-canvas-and-r
* Front-end testing
    * Jest
        * https://facebook.github.io/jest/
* Back-end testing
    * Mocha
        * https://mochajs.org/



![alt text](./doc/carl.png "This is Carl")


