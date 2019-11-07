# Waka2
___

Waka 2 is a full Pacman clone built using React, Express, PostgreSQL, and Sass (both the verbal and CSS kind). Each ghost is programmed to chase Pacman per the original game logic. Blinky will track Pacman's coordinates directly. Pinky will target 4 spaces in front of Pacman to cut off the player. Inky will also try to cut the player off by finding the halfway point between Blinky and Pacman, and then target 180 degrees from that point. Finally Clyde will follow Blinky's tracking if he is 8 or more spaces from the player, or follow scatter mode tracking if within 8 spaces. The player will win the game if the successfully evade the ghosts and collect all of the pellets. The player looses the game if they loose all three lives.
  
## Getting Started
___
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Fork and clone this repo, go to the project folder, and enter the following command to install dependancies:
```
npm install
```

### Installing
Create a .env file in the root of your project. Before you do anything else, **make sure you add .env to your .gitignore!** You will need to provide the following variables in your env:
```
SERVER_PORT = // This can be any port above 4000
SESSION_SECRET = // Any random sequence of letters and numbers to encrypt your session.
CONNECTION_STRING= // Connection string URI for your DB provider
```
**SERVER_PORT** - Server port needed to access your instance of the server. This can really be any port you want to use - we recommend using any port above 4000, to avoid colliding with the "npm start" server.

**SESSION_SECRET** - This can be any sequence of random letters and numbers that you want.

**CONNECTION_STRING** - This is the URI string given when you create a database with a database host service. In our case we used Heroku for our PostgreSQL database. So long as your database is written in PostgreSQL, any database host will work.

 - Once you setup your database, run the seed.sql file found in the **db folder** of the project. This will setup your tables as we designed them to work with the app.

Inside of your **package.json** file, add the following code above dependancies:
```JSON
"main": "server/index.js",
"proxy": "http://localhost:PORT#HERE"
```
- Replace the PORT#HERE with whatever port you chose for the server.

## Running the tests
___
To run our system tests, enter the following command inside the project folder on the terminal:
```
npm run tests
```

## Built With
___

 - [React](https://reactjs.org/) - JS Library for creating the UI.
 - [Express](https://expressjs.com/) - Web application framework used for the server.
 - [Sass](https://sass-lang.com/) - CSS Extension language used for styling.
 - [MassiveJS](https://massivejs.org/) - Data mapper for Node.js used to access and manipulate data in the database.


## Contributing
___
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch. Have an idea for an awesome feature to be added? Add a issue to the repo, and title it "feature request."

## Authors
* **Ben Eccles** - *Initial work* - [beneccles](https://github.com/beneccles) - [Portfolio](https://beneccles.dev)
* **Zachary Spilinek** -*Initial work* - [nukyew](https://github.com/nukyew)
* **Katie Cruise** -*Initial work* - [k4cruise23](https://github.com/k4cruise23)
* **Mckay Waters** -*Initial work* - [mckaypaswaters](https://github.com/mckaypaswaters)

## Acknowledgements
 * **Jonathan McDonald** - *DevMountain Instructor* - [jlmcd](https://github.com/jlmcd) - [Portfolio](https://jonmcd.me)
 * **Thierry Michel** - *Created the CodePen where we found those sweet arcade style buttons* - [thierrymichel](https://codepen.io/thierrymichel)
 * **Andrew Westenskow** - *WLH10 Mentor* - [andrewwestenskow](https://github.com/andrewwestenskow) - [Portfolio](https://westenskow.dev)
 * **Josh McCann** - *WLH10 Mentor* - [jrmccann2](https://github.com/jrmccann2) - [Portfolio](https://josh-mccann.com)
