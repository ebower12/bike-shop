# bike-shop

This is a basic example of a web shop that sells premade and custom bicycles. You can run the app locally by running `npm start` from within the `bike-shop` directory and then navigating to `localhost:3000` in a web browser.

## Decisions

- For simplicity I'm storing the cart items and saved bike configurations in local storage. In a fully functioning app there would be a DB on the backend to save this information in order to better persist it across sessions.

- No authentication was implemented, but in a full app a simple multi-role authentication flow could be implemented. At minimum there would be `user` and `admin` roles. Access to the internal configuration page would be placed behind a role based authorization check.

- A number of cosmetic improvements can and should be made to the UI components to create a better looking and more user-friendly experience. Most inline CSS styling should be moved to external CSS files.

- Some refactoring could be done to add generalized helper functions and decrease code duplication.
