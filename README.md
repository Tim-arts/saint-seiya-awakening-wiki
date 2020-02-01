# Saint Seiya - Awakening Wiki

#### Step 1
- Download the project in local from Github.
- Install [Git](https://git-scm.com/download/win), [Node.js](https://nodejs.org/en/) and [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) on your machine.
- Open the local project from an IDE and open the console.

#### Step 2

Run the command:

> npm install


To init the project locally.

#### Step 3

To deploy in production run the command:

> npm run deploy

To run the project in local run the command:

> npm run local (OR) heroku local

The local address should be: http://localhost:5000/

The remote one should be: https://saint-seiya-awakening-wiki.herokuapp.com/

If you want to kill the Heroku process run the command:

> npm run kill

#### # Utilities

To list all Heroku builds, run:

> npm run list

This way it'll list all the running builds with their specific ID. To stop a build run the command:

> heroku builds:cancel <BUILD_ID>

To get a look at the logs, run the command:

> npm run logs

To handle fixtures:

- Will load all the new fixtures
> npm run load-fixtures

- Will empty the database
> npm run remove-fixtures

- Mix of the both above, will remove and load the new fixtures
> npm run fixtures

**Warning**: Please **save** the database (using the **mongodump** command) before performing any operation.
