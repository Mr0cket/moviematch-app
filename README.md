# moviematch-app

An app to help you discover and choose movies with friends. When you and your friends like the same movie, it's a match!

[backend repo](https://github.com/Mr0cket/movieMatch-backend)

![Screenshot](discoverMovies.png)

### Who am I?
I am a student at Codaisseur from a far away land of Crocodiles and kangaroos.
I started coding in 2020 this is my portfolio assignment to build an MVP over a period of 2 weeks

My idea with this app was to make a fun game to help friends and partners decide what movies to watch.


I decided to use serveral technologies that I haven't tried previously:
- [React Native](https://reactnative.dev/) - A framework for building native react apps.
- [Socket.IO](https://socket.io/) - A solution for real time bi-directional communcation between server <=> client allowing multiple clients to interact with each other.
- 


## Project info

- [Wireframe](https://wireframepro.mockflow.com/view/Mb154b8103fbc27f9c5278251fb67604f1610192783846)
- [database model](https://dbdiagram.io/d/5ffad93a80d742080a35aede)
- [Project kanban](https://github.com/users/Mr0cket/projects/2)

## Installation

1. clone the Repo
   `git clone https://github.com/Mr0cket/moviematch-app.git`
2. Install expo command line tools `npm install --global expo-cli`
3. Install all dependencies `npm init`
4. Install the expo client app on your device ([android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [ios](https://itunes.com/apps/exponent)
5. start the project through expo with either `npm start` or `expo start`
6. using your expo-client app on your `Android` or `IOS` device, scan the QR code generated through the expo client (`android`) or your camera (`ios`)
7. Expo will load and open the App

### socket events (self explanatory)
- user/join
- user/likedMovie
- user/dislikedMovie
- party/match

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
