# heroku-react-fs

A "fullstack" React/Express app intended to be run using Heroku.

## Setup with Heroku

### Initial Steps to install with Heroku

- Create a Heroku account and [sign in(https://id.heroku.com/login)
- Install the `heroku-cli` [getting-started](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) and login
- Open your project folder, if you don't have git initialized run `git init`, add your files and make a commit
- You can connect your repo to github as you normally would
- Create a Heroku app by running the command `heroku create my-appname` note that `my-appname` would be replaced by your actual app-name. If you get a conflict, e.g. name exists, try choosing a more unique name or add a number at the end
- Now you can try to deploy your app by running `git push heroku master`
- If this fails, see the error messages, if there are no useful messages try running the command `heroku logs --tail` to see if there are any errors

### Adding and configuring a MySQL database

- Add a MySQL database by running the command: `heroku addons:create jawsdb`, alternatively you can do this through the Heroku dashboard by adding a resource to your app, open the resources tab and search for JawsDB
- In your Heroku dashboard https://dashboard.heroku.com/apps/your-app-name Click on resources and click the `JawsDB MySQL` link, this will open a new tab with info about your database e.g. the connection info. You can use this info to get connection info if you want to also use MySQL Workbench to view your database
- Back in your Heroku Dashboard click on your app and click the `more` dropdown. Then click `Run Console`
- From there type in `bash` and click `run`
- This will log you into the server through ssh to be able to run linux/bash commands
- Here we will run some `knex` scripts to seed the database data
- You will likely be in the root folder so we will need to cd into server first, run `cd server && knex migrate:latest`
- If the migration works, no errors, then run `knex seed:run`, which should also be run from the server folder however you can check this by running `pwd` first, alternatively you could also run the script in package.json `npm run dbsetup`
- If all went well, fingers crossed, you should now have a MySQL DB running in the cloud ⛅️

## Setup Local

- In the root folder run `npm run setup` which will run the command `npm install && npm run build` which will install all the required node_modules and export a build of the React app
- After running the setup you should now be able to start the app by running `npm run develop`, which will start the express app with nodemon and open React using concurrently. You will likely see an error in terminal saying "Unhandled rejection Error: ER_BAD_DB_ERROR: Unknown database 'library_db'" as we haven't created a database yet.
- Create a new database with MySQL Workbench, or if you prefer through command-line, or if you want to extend this project to manage your db with `knex` you can try [knex-db-manager](https://github.com/Vincit/knex-db-manager). The database name to create is `library_db` however you can change this by editing the file `knexfile.js` in the server folder. In fact you will likely need to edit this as your MySQL username and password may be different e.g. not `root` & `root`
- Once you've created a new database and edited `/server/knexfile.js` you can now create tables and dummy data by running the following commands: `knex migrate:latest` and `knex seed:run`, alternatively you could add these to the scripts section of package.json
- Finally run `npm run develop` and you should see your React app start with some Books and Users data, you can also try the server endpoints locally:
  http://localhost:5000/api/books , http://localhost:5000/api/authors and http://localhost:5000/api/ however note that if you visit http://localhost:5000/ you will see the React app. This is to help to deploy to just 1 server, see the redirect at the bottom of /server/server.js for more info

## Development Scripts

- To run locally see the readme in the server folder, or review the CDA in Synapse on how to get started
- the package.json file contains a script for local development which you can run from the root using `npm run develop`
- If you just want to test the server you can run `npm run server`

## Additional Resources

- [Heroku CheatSheet](https://devhints.io/heroku)
- [The Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
