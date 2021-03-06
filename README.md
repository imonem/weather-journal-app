# Weather-Journal App Project

## Table of Contents
- [Weather-Journal App Project](#weather-journal-app-project)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Requirements](#requirements)
      - [Project Environment Setup](#project-environment-setup)
      - [APIs and Routes](#apis-and-routes)
      - [Dynamic UI](#dynamic-ui)
  - [Functionality](#functionality)
    - [Server Side code](#server-side-code)
    - [Client Side code](#client-side-code)
    - [Helpful Resources](#helpful-resources)
    - [Notes](#notes)

## [Overview](#overview)

Hello again everyone, this project is all about dynamically fetching data from openweathermap.org API call, posting it to Node.js Express server then using the posted data to update the UI.

The required functionalities are broken down [**after**](#functionality) the requirements section below.

## [Requirements](#requirements)

The following table states the requirements

#### Project Environment Setup

| Criteria             | Meets Specifications|
|----------------------|---------------------|
|Node and Express Environment|<br>Node and Express should be installed on the local machine. The project file `server.js` should require `express()`, and should create an instance of their app using express.<br>The Express app instance should be pointed to the project folder with .html, .css, and .js files.<br><br>|
|Project Dependencies|<br>The ‘cors’ package should be installed in the project from the command line, required in the project file `server.js`, and the instance of the app should be setup to use `cors()`.<br><br>The `body-parser` package should be installed and included in the project.<br><br>|
|Local Server|<br>Local server should be running and producing feedback to the Command Line through a working callback function.<br><br>|
|

#### APIs and Routes

| Criteria             | Meets Specifications|
|----------------------|---------------------|
|APP API Endpoint|<br>There should be a JavaScript Object named projectData initiated in the file server.jsto act as the app API endpoint.<br><br>|
|Integrating OpenWeatherMap API|The personal API Key for OpenWeatherMap API is saved in a named `const` variable.<br>The API Key variable is passed as a parameter to `fetch()` .<br>Data is successfully returned from the external API.<br><br>|
|Return Endpoint Data<br><br>GET Route I: Server Side|There should be a GET route setup on the server side with the first argument as a string naming the route, and the second argument a callback function to return the JS object created at the top of server code.|
|Return Endpoint Data<br><br>GET Route II: Client Side|There should be an asynchronous function to fetch the data from the app endpoint|
|POST Route|<br>You should be able to add an entry to the project endpoint using a POST route setup on the server side and executed on the client side as an asynchronous function.<br><br>The client side function should take two arguments, the URL to make a POST to, and an object holding the data to POST.<br><br>The server side function should create a new entry in the apps endpoint (the named JS object) consisting of the data received from the client side POST.<br><br>|
|

#### Dynamic UI

| Criteria             | Meets Specifications|
|----------------------|---------------------|
|Naming HTML Inputs and Buttons For Interaction|<br>The `input` element with the `placeholder` property set to “enter zip code here” should have an `id` of `zip`.<br><br>The `textarea` included in project HTML should have an `id` of `feelings`.<br><br>The button included in project HTML should have an `id` of `generate`.<br><br>|
|Assigning Element Properties Dynamically|<br>The `div` with the `id`, `entryHolder` should have three child divs with the ids:<br><br>1. date<br>2. temp<br>3. content<br><br>|
|Event Listeners|<br>Adds an event listener to an existing HTML button from DOM using Vanilla JS.<br><br>In the file `app.js`, the element with the `id` of `generate` should have an `addEventListener()` method called on it, with `click` as the first parameter, and a named callback function as the second parameter.<br><br>|
|Dynamically Update UI|<br>Sets the properties of existing HTML elements from the DOM using Vanilla JavaScript.<br><br>Included in the async function to retrieve that app’s data on the client side, existing DOM elements should have their `innerHTML` properties dynamically set according to data returned by the app route.<br><br>|
|

## [Functionality](#functionality)

In order to meet the criteria for each of the above [requirements](#requirements), create an account at [www.openweathermap.org](https://home.openweathermap.org/users/sign_up) then get the API key from [here](https://home.openweathermap.org/api_keys).

The following subsections will briefly explain the server and client side codes to meet the rest of the requirements

---

### Server Side code

Server setup is achieved by running the following terminal commands

- `npm install express`
- `npm install body-parser`
- `npm install cors`

After the installation is done `require` statements are added to the `server.js` file as well as the `app.use` method for the middleware activation.

The `get` request sends back the `projectData` object and `post` route save data to the same object by creating a `newEntry` which gets `response` value, it then updates the `projectData` object by using dot notation.

**Get route** URL is `/getdatafromserver` and the **Post route** URL is `/updateprojectdata` and the <em>**server port**</em> is set at 8000

---

### Client Side code

The client side code consists of the below functions

- `weatherUpdate()`
  - which is the main function that triggers based on generate button click
- `weatherApiCall()`
  - the main hero function which builds the openweathermap API url based on personal API Key and Zip code entered by the user.
- `postToServer()`
  - called by `weatherApiCall()` after data is received from API to post data to server endpoint
- `updateRecentEntryHolder()`
  - called by `weatherApiCall()` after `postToServer()` which gets data from server endpoint to update the UI

---

### [Helpful Resources](#helpful-resources)

I looked at the following sources for references and examples

- [Express Routing](https://expressjs.com/en/guide/routing.html)
- [Fetch API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JavaScript Promises: An Introduction - Jake Archibald](https://web.dev/promises/)
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Express Server Example](https://expressjs.com/en/starter/hello-world.html)
- [Stackoverflow post on server side and client side programming](https://stackoverflow.com/questions/1404376/what-is-client-side-javascript-and-what-is-server-side-javascript)
- [Using Fetch on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Udacity Classroom and videos](https://classroom.udacity.com)

---

### [Notes](#notes)

- openweathermap.org API returns temperature in Kelvin, add `units=metric` for Celcius or `units=imperial` for Fahrenheit
- `Date.getmonth()` method counts the months from 0-11 (January-December).
- On server side code, `require` can be converted to `import` ES6 statements.
  - `import express, { static } from 'express';`
  - `import { urlencoded, json } from 'body-parser';`
  - `import cors from 'cors';`
- Implemented post and get methods by using [Axios](https://github.com/axios/axios)
- Axios parses JSON data by default and protects against [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)
- Fixed the layout for the app
- Tempratures units now show in degree Celcius.
