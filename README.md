# bike-shop

This is a basic example of a web shop that sells premade and custom bicycles.

To run the app locally:

- Run `npm run dev` from within the `bike-shop-backend` directory to stand up the backend API locally on port 3001.
- Run `npm start` from within the `bike-shop` directory to stand up the frontend, then navigate to `localhost:3000` in a web browser.

## Decisions

- I chose a react app for the frontend and an express server for the backend. React provides excellent functionality for a frontend webapp, including state management and dynamic components, and express is very fast and easy to set up for a simple backend API.

- No authentication was implemented, but in a full app a simple multi-role authentication flow could be implemented. At minimum there would be `user` and `admin` roles. Access to the internal configuration page would be placed behind a role based authorization check.

- A number of cosmetic improvements can and should be made to the UI components to create a better looking and more user-friendly experience. Most inline CSS styling should be moved to external CSS files.

- Some refactoring could be done to add generalized helper functions and decrease code duplication.
