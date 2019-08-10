# Fullstack Task List

This is a fullstack CRUD project that allows user to create an account and then create multiple task lists.

[Live Demo](https://brann-todo-list.herokuapp.com/)

## Stack

The project is built using the MERN stack.

#### Front End

The front end is a react app written in JavaScript and using SCSS for styling.
The app makes use of libraries such as: 
  * `react-router` - for login and signup routes
  * `redux` - for state management  
  * `redux-thunk` - for asynchronous redux actions

#### Back End

The backend runs on Node and uses the `express` framework. It serves static content as well as providing a REST API.

It uses the `mongoose` library to connect to a MongoDB database and also to create and mange database schemas.

Authentication is managed by way of `jwt` (JSON Web Tokens). Protected routes use a custom piece of express middleware that authenticates whether a request has access or not. Passwords are encrypted using `bcrypt`.

## Motivation

Created this project as my first full-stack project to learn the basics of creating a REST API and creating a frontend that interacts with said API.