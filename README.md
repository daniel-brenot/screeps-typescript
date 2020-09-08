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

# Efficiency considerations

## Foreach
For the moment, it seems the foreach function is faster than a for each loop

## Equality
Always use triple equals to test equality as opposed to double equals.
The difference is about 30%.

## Undefined comparison
When checking for undefined, use the `typeof var === 'undefined'` check.
This is a bit uglier, but more efficient than the `!!var` syntax.
This makes me sad.

# Splitting strings
Between slice, substring and substr, substring is the fastest.

