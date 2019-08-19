# TypeScript + React + Redux Tour of Heroes

This is a project that implements Angular's [Tour of Heroes example app](https://angular.io/tutorial) using React and
Redux instead of Angular.

The repo starts out with a template from Microsoft, cleans it up, then implements and refactors the app step-by-step,
following along the 6 chapters of the Angular tutorial. I've tried to keep the structure of the app close to the Angular
version as much as it makes sense.

When the implementation gets to the asynchronous parts, I have a few alternate branches that use different libraries
since Redux has no built-in way to handle async workflows. The `master` branch uses redux-saga since I feel that it is
the most straight-forward and maintainable approach, but you can look at the `redux-observable` branch to see that
implementation. There is also an incomplete `redux-thunk` branch.

## Running the app

Unless you check out an older version of the repository that doesn't make API calls, you'll need an API server for Tour
of Heroes. You can use [this one built on .NET Core](https://github.com/mattstermiller/TourOfHeroesServer) or any other
one designed to be used for the Angular Tour of Heroes app.

Once the API server is running, run the `yarn start` command in the root folder of this repo.

