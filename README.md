# Install dependencies

Run `npm install` or `yarn` to install all dependencied

# Building

Run `npm run-script build` or `yarn build`

# Credentials for deployment

Create a file in the main directory called `.screeps.json` and put the following information in it:

  {
    "email": "<YOUR email>",
    "token": "<YOUR auth token>",
    "branch": "<YOUR target branch>"
  }

# Deploying to screeps

Run the command `npm run-script deploy` or `yarn deploy`
