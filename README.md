# Tetrad Custom Push-Pin Manipulation Tool

## Summary
Our project is to build a module where users can upload their custom images to create push-pin images which can be used to be displayed on Google Map. 

## Architecture
1. Back-end
    * Node.js: REST API provider. user verification. interaction with Amazon S3
        * express.js: web framework for building the REST API
        * AWS SDK: file upload/download redirect to S3 bucket
    * MySQL: stores image related data specific for each user
    * NGINX: web server
    * Docker: for a stream-lined development process. prevents development environment divergence
    * !!! testing framework

2. Front-end
    * React.js: single page application library
    * !!! testing framework


## Notes
* building a REST API
    * what is REST architecture
        * https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm
    * using Express.js
        * http://expressjs.com/
* redirecting user image request to S3
    * using pipe
        * http://stackoverflow.com/questions/17516820/serving-files-stored-in-s3-in-express-nodejs-app
        * http://stackoverflow.com/questions/19883561/showing-an-image-from-amazon-s3-with-nodejs-expressjs-and-knox
* React.js
    * basic tutorial
        * https://www.youtube.com/playlist?list=PL6gx4Cwl9DGBuKtLgPR_zWYnrwv-JllpA
* dockerizing a Node application
    * will be connecting Node, MySQL, and NGINX containers
    * https://nodejs.org/en/docs/guides/nodejs-docker-webapp/




![alt text](./doc/carl.png "This is Carl")


