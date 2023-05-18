# Video Search 

![language](https://img.shields.io/badge/Language-JavaScript-yellow)
![server](https://img.shields.io/badge/Backend-Node/Express-green)
![frontend](https://img.shields.io/badge/Frontend-React-blue)
![database](https://img.shields.io/badge/Database-MongoDB-red)
![auth](https://img.shields.io/badge/Auth-JWT-orange)
![API](https://img.shields.io/badge/API-YouTube-red)

## Description

This application allows a User to register/login to the application using JSON web tokens (JWT) for user authentication. The user has the ability to enter a search term, which makes a request to the YouTube API. A grid of results will then be displayed, the user has the ability to select a video from the list for a detailed view. A logged in User may save videos to their personal profile and view all saved videos in their favorites list. Saved videos may be removed from Users favorite’s view. The application is designed to be mobile responsive and user friendly. 


[YouTube Video Search](https://video-search-react.onrender.com/)

&nbsp;

## User Story:

As a YouTube video user, I want to be able to search by topic and save videos to my user favorites dashboard/profile. I also want the ability to remove a video from my saved favorites list.

&nbsp;

## Acceptance Criteria:

As a user, I can register and sign-in to my account using my email and password.
As a user, I can add to and delete from my favorites listings if I am an authenticated user.
As a user, I can search for videos using the YouTube API based on user keyword input.
As a user, I can view the details of a keyword search, including its title, thumbnail preview, content creator and short description.
As a user, I can add friends and see their list of saved favorites – yet to implement
As a user, I can access the online platform from any device, and the platform should be responsive and user-friendly.
As a user, I expect the online platform to be secure and protect my personal information.

&nbsp;

## Usage

A User Can:

- Register
- Login
- Authorized User is allowed to Save or Remove a video from favorites list


A Favorite Can:

- Be Added to the current Users favorites
- Be Removed from the current Users favorites


&nbsp;

## Installation

Start by cloning the project Repo

```bash
$> git clone https://github.com/ehoversten/video_search_api
```

Install project dependencies

```javascript
$> cd video_search_api

$> npm install
// OR using YARN
$> yarn install
```

Run the application locally

```javascript
$> npm run start
```

&nbsp;

## Deployment

React Frontend and NodeJS Backend Deployed on Render.com

&nbsp;

## Built With

- [JavaScript]() - Development Language
- [Node](www.nodejs.org) - Backend Sever
- [Express]() - Web framework
- [React]() - Frontend 
- [React-Bootstrap]() - CSS Framework
- [MongoDB]() - Database Storage
- [Mongoose]() - Database ORM
- [JWT]() - User Authentication using JSON Web Tokens

&nbsp;

## Versioning

Version 1.1

&nbsp;

## Authors

- **Erik Hoversten** - _Backend API and Database Development_ - GitHub: [ehoversten](https://github.com/ehoversten)
- **Jose Gonzalez** - _Frontend, Styling and React Development_ - GitHub: [Exia01](https://github.com/Exia01)

See also the list of [contributors](https://github.com/ehoversten/video_search_api/graphs/contributors) who participated in this project.

&nbsp;

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
