# Fullstack Project - Users Management System

# Requirements
* Node 8x +
* Mongo 4.x + ex: (localhost:27017)
* Angular CLI: 8.2.2
* Node: 10.15.0
* Angular: 8.2.11

## FRONTEND
This project uses [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.
- Install: `npm install`
- Run: `ng serve`

## BACKEND - REST API
The entire api is contained on api folder
- Install: `npm install`
- Run: `npm start` or `nodemon server`

## Get list of Users

### Request Endpoints
`GET http://localhost:4000/users`

`GET http://localhost:4000/users/search/:work` -> Search user by specific word

`PUT http://localhost:4000/users/update/:objectId`

`POST http://localhost:4000/users/add`

`DELETE http://localhost:4000/users/delete/:objectId`

### Response
    ...
    Content-Type: application/json
    []
    
## RUN PROJECT (Need to start backend api and frontend app)

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
Go to api folder and run `npm start`


