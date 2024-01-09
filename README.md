Vite + Bulma + Netlify
======================

This repository includes several packages:

* [Vite](https://vitejs.dev) as the bundler
* [React](https://react.dev/), plus [react-router](https://reactrouter.com/en/main) and [react-helmet](https://github.com/nfl/react-helmet#readme)
* [Bulma](https://bulma.io/) for a CSS/Sass toolkit
* [Font Awesome](https://fontawesome.com/) free for icons
* [Netlify Functions](https://docs.netlify.com/functions/overview/) for any backend calls or API
* [Ramda](https://ramdajs.com/) for functional programming
* [Cypress](https://cypress.io) for E2E testing
* Prettier for code formatting

It's set up for immediate deployment to Netlify, and Github Dependabot. It will not build Netlify branch deployments on Dependabot PRs.

The following NPM targets are supported:

* `npm run dev` - run the web server itself on port 5173
* `npm run dev:netlify` - run the web server plus Netlify Functions on port 8888
* `npm run cypress:open` - for interactive Cypress testing
* `npm run cypress:run` - to run all E2E tests
* `npm run prettier` - for code linting

Bulma and Font Awsesome are already configured in `src/App.sass`.