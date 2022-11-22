
Demo use of an express server to perform crud operations on Google Firestore.

### Getting started

`npm install`

`npm run start-frontend`

`npm run start-server`

## Backend

- The server uses express, .env variables, routes, controllers.

- All the banner data: [http://localhost:8080/api/getBanners](http://localhost:8080/api/getBanners)

## Frontend

- A custom hook called `useFirestore` is used for making axios calls to the backend. These calls use the response from backend to update the App Context.

- The banners are being fetched every time the pages Landing & Dashboard are being hit and also updating the context store.
