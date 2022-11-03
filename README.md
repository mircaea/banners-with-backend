This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project uses a backend server to run crud operations for banners.

## Scripts

GitHub CLI:

`gh repo clone mircaea/banners-with-firestore-backend`

`npm install`

`npm run start-frontend`

`npm run start-server`

Run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Backend

- The backend server uses express with: .env variables; routes & controllers; accepts only `/api` requests.

- Get all the banners from the db: [http://localhost:8080/api/getBanners](http://localhost:8080/api/getBanners)

## Frontend

- A custom hook called `useFirestore` is used for making axios calls to the backend. These calls use the response from backend to update the App Context.

- The banners are being fetched every time the pages Landing & Dashboard are being hit; also updating App Context.
