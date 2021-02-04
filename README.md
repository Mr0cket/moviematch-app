# moviematch-app

An app to help you discover and choose movies with friends. When you and your friends like the same movie, it's a match!

[backend repo](https://github.com/Mr0cket/movieMatch-backend)

### Screenshots:

<img alt="Discover Movies Tab" src="/assets/DiscoverMovies.png" height="400" /> <img alt="Party Matches Tab" src="/assets/PartyMatches.png" height="400" /> <img alt="Liked Movies Tab" src="/assets/LikedMovies.png" height="400" />

### Who am I?

I am a student at Codaisseur from a far away land of Crocodiles and kangaroos.
I started coding in 2020 this is my portfolio assignment to build an MVP over a period of 2 weeks

My idea with this app was to make a fun game to help friends and partners decide what movies to watch.

I decided to use serveral technologies that I haven't tried previously:

- [React Native](https://reactnative.dev/) - A framework for building native react apps.
- [Socket.IO](https://socket.io/) - A solution for real time bi-directional communcation between server <=> client allowing multiple clients to interact with each other.

## Project info

- [Wireframe](https://wireframepro.mockflow.com/view/Mb154b8103fbc27f9c5278251fb67604f1610192783846)
- [database model](https://dbdiagram.io/d/5ffad93a80d742080a35aede)
- [Project kanban](https://github.com/users/Mr0cket/projects/2)

## Installation

1. clone the app Repo
   `git clone https://github.com/Mr0cket/moviematch-app.git`
2. Install expo command line tools `npm install --global expo-cli`
3. Install all dependencies `npm init`
4. clone & install dependencies for backend repo
5. Install the expo client app on your device ([android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [ios](https://itunes.com/apps/exponent)
6. start the project through expo with either `npm start` or `expo start`
7. using your expo-client app on your `Android` or `IOS` device, check you and the computer are on the same network, scan the QR code generated in the terminal/browser. 
- you can scan the QR code through the expo client app for `android`, or your camera for `ios`
7. Expo will load and open the App
8. in the backend repo, start the server `npm start` & copy the local area network address of the BE
9. in FE repo navigate to `/src/config/constants.js` replace the address in line 4 with the address for your own backend.

### socket events (self explanatory)

- user/join - an event which the client sends on successful connection with the server containing user authentication details
- user/likedMovie - event emitted by client when the user likes a movie
- user/dislikedMovie - event emitted by client when the user likes a movie
- party/match - event emitted by server when it detects a party match.

### HTTP Endpoints

Most endpoints are OAuth 2.0 Bearer Token Authenticated (auth)

#### User authentication

- POST /login
- POST /signup
- GET /me - (auth)

#### /movies - Fetch user movie lists

- GET /movies/liked (auth) - fetches the user's list of liked movies
- GET /movies/matches - (auth) - fetches the user's list of party matched movies

#### /party

- GET /party (auth) - fetches the user's party members
- POST /party/invite (auth) -

#### GET /stagingList - dynamic Lists of movies shown to user

uses an algorithm which weights:

- movies liked by other users in the party,
- movies previously the user has already interacted with
- etc...

## Future Features:
- a Movie Details screen/modal which is accessed by clicking on a movie card.
- Improved Discover Movies page
   - Ability to use touch gestures (swiping) to like/dislike a movie
   - Dynamic Animations for like & dislike events
- Improved UI/UX for signup, My Account screen, My Party screen & Match popup modal
- Better interface to manage parties 
   - mechanism for user to accept or decline a party invitation when invited
   - ability to remove a user from your party, or join another party
