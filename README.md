# eat-this
CS 320 Project for Dining in Amherst

## Build Process
- Install `git`, `npm`, `node` on your local machine. Check their validity on the command-line
- Clone the repository
  - You can use GitHub Desktop, but the `git` command line is also great
- Make sure you're on the right branch you need to work on. Check `Contributing` for more details
- Go to the project directory, the folder: `eat-this` using Terminal or CMD (this can be done using `cd`)
  - Example `cd` command looks like: `cd ~/dev/git/eat-this` to get into the eat-this folder/directory
- Run `node server.js` to start the node server
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

## Assignments

### 1. Software Requirement Specifications - 10/04/2022

Refer to drive link [here](https://docs.google.com/document/d/1_EHqrhuLGR-dN5SB_UUuSyfDGl9PGa2b-hvZCkuTv3Q/edit?usp=sharing)

### 2. Software Design Specifications - 10/11/2022

Refere to drive link [here](https://docs.google.com/document/d/1nJ_7lThzWetma2WaJRYS9YIeebpiZum9t1St1bZ9gVY/edit?usp=sharing)

#### Description

Eat This! allows UMass students to find dining locations based on their preferences and live data at their search time. Users can input any dining preferences they have, both general and day-to-day, and will be given dining location suggestions based on those preference availability and distance to locations. Users will also be presented with a list of off-campus dining locations in addition to the on-campus dining commons. Overall, Eat This! enables UMass students and visitors to explore dining options tailored to their preferences and with ease. The current UMass Dining app only provides a static menu that users need to scroll through, in addition to vague crowd density measures. Eat This! hopes to provide an improvement to this and give students an enhanced experience. 

#### Scope

The “Eat This!” app is focused on delivering quick recommendations for users in a fast-paced environment. That accompanies limitations on the extent of user choices the app will present. The app is limited to providing the best options close to a user's location and menus. 

- Conceptual Limitations:
  - We are not providing a social experience; there are no in-app chat or friend features. 
  - Crowd densities and wait times for dining options. Schedule integrations; we will not accommodate people’s schedules to make recommendations. 
  - The web app is meant to serve the Amherst community at the present moment and is limited in the range of service.

- Hardware and Software Packages:
  - The software should be hosted on the web and accessible using a normal web browser on desktop and mobile devices. 
  - The application relies on the users sharing their live locations

- Performance Reliability:
  - Depends on the user device network capabilities
  - Depends on the appropriate functioning of UMass Dining services and updated menus



