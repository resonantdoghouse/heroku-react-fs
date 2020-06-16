# heroku-react-fs

A "fullstack" React/Express app intended to be run using Heroku.

## Setup with Heroku

### Initial Steps to install with Heroku

- Create a heroku account and sign in
- Install heroku-cli [getting-started](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
- Go to your project folder and if you don't have git initialized run `git init`, add your files and make a commit
- You can connect your repo to github as you normally would
- Create a Heroku app by running the command `heroku create amazing-appname` note that `amazing-appname` would be replaced by your actual app name. If you get a conflict, name exists, try choosing a unique one or add a number at the end.
- Now you can try to deploy your app by running `git push heroku master`
- If this fails, see the error messages, if there are no useful messages try running the command `heroku logs --tail` to see if there are any errors

### Adding and configuring a MySQL database

- Add a MySQL database by running the command: `heroku addons:create jawsdb`
- In your heroku dashboard https://dashboard.heroku.com/apps/your-app-name Click on resources and click the `JawsDB MySQL` link, this will open a new tab with info about your database e.g. the connection info. You can use this info to get connection info if you want to also use MySQL Workbench to view your database
- Back in your Heroku Dashboard for your app click on the `more` dropdown and click `Run Console`
- From there type in `bash` and click `run`
- This will log you into the server through ssh to be able to run linux/bash commands
- Here we will run some `knex` scripts to seed the database data
- You will likely be in the root folder so we will need to cd into server first, run `cd server && knex migrate:latest`
- If the migration works, no errors, then run `knex seed:run`, which should also be run from the server folder however you can check this by running `pwd` first
- If all went well, fingers crossed, you should now have a MySQL DB running in the cloud ⛅️

## Setup Local

- In the root folder run `npm run setup` which will run the command `npm install && npm run build` which will install all the required node_modules and export a build of the React app
- After running the setup you should now be able to start the app by running `npm run develop`, which will start the express app with nodemon and open React using concurrently

## Development Scripts

- To run locally see the readme in the server folder, or review the CDA in Synapse on how to get started
- the package.json file contains a script for local development which you can run from the root using `npm run develop`
- If you just want to test the server you can run `npm run server`

## Additional Resources

- [Heroku CheatSheet](https://devhints.io/heroku)
- [The Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
