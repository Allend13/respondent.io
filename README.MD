## Application

To run this application you'd better have a MongoDB 3.6

Project contains 2 folders : `client` and `server`

To install dependencies run  `npm install` in both folders.

Running `npm run dev` in each folder will start every application

`npm run test` in `/server` will run basic test for database


### How to fill server and database with mock users:

From the very beginning, our application do not have any users.

To generate some, just make `GET` request to `/generate` endpoint.

For example place `http://localhost:3000/generate` to browser URL.

This will fill database with plenty of users (e.g 200+) from mock data.

They will be stored in database, until you `GET` that endpoint again.

There are some foundation for endpoints to make CRUD operations with users also.

