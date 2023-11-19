# CineTracker

A Movie List App is a web application built with ReactJS (NextJS) and TypeScript. It allows users to search for movies, view details, and manage their watchlist and watched list. The app integrates with Google Drive to save and retrieve watchlists.

## Build status
[![Netlify Status](https://api.netlify.com/api/v1/badges/c6059543-cfcb-46a1-a4fb-e77031491b29/deploy-status)](https://app.netlify.com/sites/aesthetic-maamoul-645af6/deploys)

## Developement Progress
- [x] Search page
    - [x] search page 
    - [x] movie tiles
    - [x] pagination
- [x] UI revamp
- [ ] GDrive api
   - [ ] get GDrive API keys and basic flow
      - [ ] login with google, permissions page
      - [ ] save token and all
   - [ ] add to watch list
   - [ ] add to watched list
   - [ ] persist state
- [ ] Details Page
- [ ] Store (not needed)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Third-Party APIs](#third-party-apis)
- [Configuration](#configuration)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for movies, TV shows, and anime.
- View detailed information about a selected movie.
- Add and remove movies from the watchlist and watched list.
- Watchlist and watched list data is saved to Google Drive.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/movie-list-app.git
   ```

2. **Install Dependencies:**
   ```bash
   cd movie-list-app
   npm install
   ```

3. **Set Up Google Drive API:**
   - Follow the instructions in [Google Drive API documentation](https://developers.google.com/drive) to set up API credentials.

4. **Configure Environment Variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
   REACT_APP_MOVIE_DB_API_KEY=your-movie-db-api-key
   ```

## Usage

1. **Run the App:**
   ```bash
   npm start
   ```
   This will start the development server. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

2. **Search for Movies:**
   Use the search bar to find movies, TV shows, or anime. Click on a movie to view details.

3. **Manage Watchlist:**
   Add or remove movies from your watchlist by clicking the respective buttons on the movie details page.

4. **Save to Google Drive:**
   Sign in with your Google account to enable watchlist data to be saved to Google Drive.

## Third-Party APIs

- **The Movie Database (TMDb):**
  The app uses the TMDb API to fetch movie details and ratings. You can obtain an API key [here](https://www.themoviedb.org/documentation/api).

- **Google Drive API:**
  The Google Drive API is used to save and retrieve watchlist data. Follow the [Google Drive API documentation](https://developers.google.com/drive) to set up API credentials.

## Configuration

- **Environment Variables:**
  - `REACT_APP_GOOGLE_CLIENT_ID`: Google API client ID.
  - `REACT_APP_MOVIE_DB_API_KEY`: TMDb API key.

## Contributing

Contributions are welcome! If you have ideas for improvements or find any issues, feel free to open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).