## Live Web Project
Visit the live version of this project [DEMO HERE](https://movies-guide-eb5a7.web.app/).

## Table of Contents
- [Features](#features)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [License](#license)

## Features
1. Browse Movies: Users can browse a list of popular movies fetched from the TMDb API.
2. Search Movies: Users can search for specific movies using the search functionality.
3. View Movie Details: Users can view detailed information about each movie, Trailer, including synopsis, release date, and ratings.
4. User Authentication: Users can sign up, log in, and log out using Firebase Authentication. Authentication tokens are used for auto-logout based on expiration time.
5. Save Movies: Logged-in users can add movies to their watchlist, watched list, and favorites list. Movie data is stored in Firebase Firestore.
6. Lazy Loading: The website uses lazy loading to optimize performance by loading modules dynamically.

## Usage
- Sign up or log in to the website.
- Browse (popular, top rated, coming soon) movies on the home page or search for specific movies using the search bar.
- Click on a movie to view its details, cast, crew, release date and ratings.
- Watch trailers for movies.
- Add movies to your watchlist, watched list, or favorites list, You can also give ratings to the movies by selecting a star rating, allowing you to track and express your opinions on each film.
- View and manage your lists in the Lists section.


## Technologies Used
- **[Angular](https://angular.io/)**: Frontend framework for building the website.
- **[Firebase](https://firebase.google.com/)**: User authentication and real-time data storage.
- **[TMDb API](https://www.themoviedb.org/documentation/api)**: Provides movie data for the application.
- **[Bootstrap](https://getbootstrap.com/)**: CSS framework for responsive design.
- **[Font Awesome](https://fontawesome.com/)**: Library for scalable vector icons.
- **[Swiper](https://swiperjs.com/)**: Touch slider for carousels and galleries.
- **[ngx-toastr](https://github.com/scttcper/ngx-toastr)**: Notifications for user feedback.


## Getting Started

*Prerequisites*
1. Install Angular CLI:
   ```bash
   npm install -g @angular/cli

*Run*
1. Clone this repository** to your local machine:
   ```bash
   git clone https://github.com/A13DO/movies-guide.git
2. Navigate to the project directory in your terminal:
   ```bash
    cd YOUR-REPOSITORY-NAME
3. Install the required dependencies by running:
   ```bash
   npm i
4. Start the development server:
   ```bash
   ng serve

## License
This project is licensed under the MIT License. See the LICENSE file for details.

