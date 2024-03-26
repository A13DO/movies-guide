## Overview
This is a web application for movie enthusiasts to keep track of their favorite movies, create watchlists, and mark movies as watched. The application allows users to search for movies, view movie details, watch trailers, and read about the cast and crew.

## Live Web Project
Visit the live version of this project [DEMO HERE](https://movies-guide-eb5a7.web.app/).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Features

1. ### Browse Movies: 
Users can browse a list of popular movies fetched from the TMDb API.
2. Search Movies: Users can search for specific movies using the search functionality.
3.  View Movie Details: Users can view detailed information about each movie, Trailer, including synopsis, release date, and ratings.
4. User Authentication: Users can sign up, log in, and log out using Firebase Authentication. Authentication tokens are used for auto-logout based on expiration time.
5. Save Movies: Logged-in users can add movies to their watchlist, watched list, and favorites list. Movie data is stored in Firebase Firestore.
6. Lazy Loading: The website uses lazy loading to optimize performance by loading modules dynamically.



## Technologies Used
- Angular: Frontend framework for building the website.
- Firebase: Authentication and Firestore for user authentication and data storage.
- TMDb API: Fetches movie data for displaying on the website.
- Bootstrap
- Font Awesome
- Swiper
- ngx-toastr

## Getting Started

To run the application, you will need to have Node.js and Angular CLI installed on your computer. Once you have installed these dependencies, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3

## Usage
- Sign up or log in to the website.
- Browse (popular, top rated, coming soon) movies on the home page or search for specific movies using the search bar.
- Click on a movie to view its details, cast, crew, release date and ratings.
- Watch trailers for movies.
- Add movies to your watchlist, watched list, or favorites list by clicking on the corresponding buttons.
- View and manage your lists in the Lists section.

## Credits
- The Movie Database (TMDb) API: Provides movie data for the website.
- Firebase: Provides authentication and data storage services.


## License
This project is licensed under the MIT License. See the LICENSE file for details.


Architecture
Explain the overall architecture of the project, including key components, modules, and their interactions.

## Project Structure

movie-guide/
├── src/
│   ├── app/
│   │   ├── header/              #
│   │   ├── auth/                # Authentication module
│   │   ├── core/                # Core services (API service, AuthGuard)
│   │   ├── home/                # Home page module
│   │   ├── movie-details/       # Movie details module (lazy-loaded)
│   │   ├── person-details/      # Person details module (lazy-loaded)
│   │   ├── nav-menu/            # 
│   │   ├── search/              # Search module (lazy-loaded)
│   │   ├── lists/               # Lists module (watchlist, watchedlist, favorites) (lazy-loaded)
│   │   └── shared/              # Shared components, services, and utilities
│   ├── assets/                  # Static assets (images, fonts, etc.)
│   ├── environments/            # Environment configurations
│   ├── firebase/                # Firebase configuration
│   └── ...
├── node_modules/
├── package.json
├── angular.json
├── tsconfig.json
└── README.md
