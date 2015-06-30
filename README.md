#WaiterFree

##Description

An Meteor based realtime web application to shorten the order process in restaurant.

##Resources

* Card wall

        https://trello.com/b/MhxObC2y/waiterfree

* CI

        https://travis-ci.org/msk86/WaiterFree

* Staging

        http://waiter-free.meteor.com

##Development

### Environment(Mac OSX)

* Meteor.js
    * Installation

            curl https://install.meteor.com/ | sh

* MongoDB
    * Installation

            brew install mongodb

    * Configuration for **dbpath**

            sudo mkdir -p /data/db
            sudo chmod 0755 /data/db
            sudo chown {userName}:staff /data/db

### Run tests

        meteor --test

### Start app

        meteor --settings private/settings.json

### Inject fixture data

        meteor reset /* Reset the database so the fixture data can be injected to database */

### Test directories

* tests/jasmine/client/integration


* test/jasmine/server/integration


* tests/jasmine/client/unit && test/jasmine/server/unit

    * **UNIT TEST** is deprecated, don't write unit test for now

### Code style

* JS file should be written in ES6 format, and extension with `.jsx`. (Except test, test should only be written in ES5, `babel` didn't apply on the test files)

* Stylesheets is written by LESS, extension with `.less`.
