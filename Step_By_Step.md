# GraphQL React Apollo Tutorial Follow-Along

Tutorial by Brad Traversy at https://www.youtube.com/watch?v=SEMTj8w04Z8

## Create a server from Scratch

### Initialize JSON package:

- npm init: _Answer the questions_

### Install dependencies:

- npm i graphql
- npm i express-graphql: _allows graphql to integrate with express_
- npm i express
- npm i axios: _to make requests from the API_

### Install nodemon if not already

- npm i nodemon -D

### Add Some "start" Scripts to the package.json scripts object

- "start": "node server.js":
- "server": "nodemon server.js":

## Create server.js file:

https://github.com/graphql/express-graphql has starter code to copy paste the below dependencies.

### Import Dependencies:

    const express = require("express");
    const graphqlHTTP = require("express-graphql");

### Set up app.use

- Look at server.js file for the app.use set up, explained below:
  - graphql allows you to have one endpoint rather having to have multiple when using express alone.
    - "/graphgl": _The end point_
    - graphqlHTTP: _What the endpoint runs on_
    - schema: schema,
    - graphiql: true: _Tool used as client to make queries to the server_

### Set up your port

- const PORT = process.env.PORT || 5000;
- app.listen(5000, () => console.log(`Server started on ${PORT}`))

## Create schema.js file where all the graphql stuff will go.

- Create the file schema.js
- Require it in the server file:
  - const schema = require(./schema.js)
- graphql supports many types of data structure. For this application, objects will be used.
- _See schema.js_ for setup details.

## Test endpoint using graphiql

- Make sure graphiql is set to true in the server.js file to use this testing method.
- got to the localhost port specified for the app (5000), followed by /graphql. Like this: localhost:5000/graphql
- Delete the readme section
- Test request by inputting a request object from the RootQuery and a data property from LaunchType in schema.js: Example: {launch {flight_number}}

## Create an endpoint to get a single launch by it's number

- go to schema.js for specifics

## Test endpoint using graphiql

- choose a specific launch to get all it's data
  ```
    {
        launch(flight_number: 2) {
        mission_name,
        launch_year,
        launch_date_local,
        launch_success,
        rocket {
            rocket_name
            }
        }
    }
  ```

## Create a React app into a client folder

- In the terminal type: create-react-app client

## Install concurrently

This allows you to run both the front-end port (3000) and back-end (5000) port at the same time.

- Go into server (root) package.json and create the following scripts:
  - "client": npm start --prefix client": _This will run the React application in the client folder_
  - "dev": "concurrently \"npm run server\" \"npm run client\"": _This will run both the server and the client at the same time with one command (npm run dev) instead of doing npm run server and npm run client_

## Do some clean up

- App.css: keep the file but delete the css.
- logo.svg: delete is it's the React logo you don't need that
- App.js:
  - Reference to logo: delete it
  - Header: delete it
  - Put SpaceX inside h1 tags: Use as placeholder text inside div

## Clean add bootstrap custom them and title in public/index.html

- go to bootswatch.com
- Click on a theme
- Click on download
- Copy file into your src folder
- Add link in the head
- Remove all comments
- Add title: SpaceX

## Add SpaceX logo to the page

- Import the logo
- Add styled logo image
- See App.js for details

## Install apollo client
Helps you quickly build a UI that fetches data with GraphQL
- IMPORTANT: Make sure you install it in the client directory
- npm install apollo-boost react-apollo graphql

## Import all Apollo dependencies
- App.js for details

## Install ES7 React/Redux/GraphQL/React-Native snippets into VS code to help quickly create React, GraphQL code.

## Create component folder in src folder
- We'll work on a component called launches first.
    - create lunches.js
    - see launches.js for setup detail
## Import and display Launches component in App.js
- See App.js for details