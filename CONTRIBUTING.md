## Build Process
- Install `git`, `npm`, `node` on your local machine. Check their validity on the command-line
- Clone the repository
  - You can use GitHub Desktop, but the `git` command line is also great
- Make sure you're on the right branch you need to work on. Check `Contributing` for more details
- Go to the project directory, the folder: `eat-this` using Terminal or CMD (this can be done using `cd`)
  - Example `cd` command looks like: `cd ~/dev/git/eat-this` to get into the eat-this folder/directory
- Run `npm install` to install dependencies and then run `node server.js` to start the node server
- This should run your server on port 8000 and connect to the MongoDB database online
  - Make sure to reach out if you have errors or problems, and look for online solutions
- After getting the Node.js server running and connected with MongoDB, we need to setup the local React environment
- Go to the `client` folder/directory using the `cd` command on the command-line (Terminal or CMD): `cd client`
- Run `npm install`. This should download all the dependencies for the project. Ask if you get errors
- Run `npm start`. This should start a local app instance that should be connected to your Node.js server

## Contributing
- Branch naming scheme: `<author>/<description>`
- Make sure you make a new branch for your work
- Make sure that your branch is as upto date with develop as possible
- Make sure you make a pull request (comparing to develop) to make changes
- Make sure you request at least one review on your pull request before merging
