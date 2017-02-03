# Express app with nodemon development server and Mocha testing

Use [nodemon's](https://github.com/remy/nodemon) legacy mode to monitor file changes in your container. The app will restart, if you change any **.js**, **.json** or **.hjs** file.

## Prerequisites

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/installation/mac/) for Mac OS X
* [Install instructions](https://docs.docker.com/installation/ubuntulinux/) for Ubuntu Linux
* [Install instructions](https://docs.docker.com/installation/) for other platforms

Install [Docker Compose](http://docs.docker.com/compose/) on your system.

* Python/pip: `sudo pip install -U docker-compose`
* Other: ``curl -L https://github.com/docker/compose/releases/download/1.1.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose; chmod +x /usr/local/bin/docker-compose``

## Running with development configuration

Run `make run`. It will

* build docker containers configured for development with Nodemon monitoring for changes

## Running the testing scripts

Run `make test`. It will
* build docker containers configured for running testing scripts with Mocha

Run `make test-only`. It will
* skip the build step, and run the testing scripts right away
* this is to save time when attempting to test scripts continuously
* run this command, if you only want to run test scripts assuming nothing should be rebuilt