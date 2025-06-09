# 🎬 Film Finder

Film Finder is a dynamic web application that allows users to discover trending movies and TV shows, filter content by genre and minimum rating, watch trailers, and keep track of their liked content.

## ✨ Features

*   **Trending Content**: Browse the latest trending movies and TV shows.
*   **Content Type Toggle**: Easily switch between movies and TV shows.
*   **Genre Filtering**: Filter content by various genres for both movies and TV shows.
*   **Rating Filter**: Discover content with a minimum average rating.
*   **Detailed Information**: View movie/TV show titles, release dates, ratings, and overviews.
*   **Trailer Playback**: Watch official trailers directly within the app via an integrated YouTube player.
*   **Liked Lists**: Keep a personalized list of your favorite movies and TV shows.
*   **Responsive Design**: Enjoy a seamless experience across different devices.

## 🚀 How to Use

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/Film-Finder.git
    cd Film-Finder
    ```
    *(Note: Replace `https://github.com/your-username/Film-Finder.git` with the actual repository URL if this project is hosted.)*

2.  **Open `index.html`**:
    Simply open the `index.html` file in your web browser. All necessary JavaScript and CSS files are linked locally.

3.  **API Key**:
    The application uses The Movie Database (TMDB) API. An API key is already included in `script.js` for demonstration purposes. If you wish to use your own key or if the provided key becomes invalid, you can obtain one from [TMDB API](https://www.themoviedb.org/documentation/api) and update the `tmdbKey` constant in `script.js`.

    ```javascript
    // script.js
    const tmdbKey = 'YOUR_TMDB_API_KEY_HERE';
    ```

## 🛠️ Technologies Used

*   **HTML5**: For structuring the web content.
*   **CSS3**: For styling the application and ensuring responsiveness.
*   **JavaScript (ES6+)**: For all dynamic functionality, API interactions, and DOM manipulation.
*   **The Movie Database (TMDB) API**: For fetching movie and TV show data, including trending lists, details, and trailers.

## 💡 Future Enhancements

*   **Search Functionality**: Implement a search bar to find specific movies or TV shows.
*   **Pagination/Infinite Scroll**: Improve content loading for large result sets.
*   **User Authentication**: Allow users to save their liked lists persistently across sessions.
*   **More Filters**: Add filters for release year, language, etc.
*   **Accessibility Improvements**: Enhance accessibility for users with disabilities.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
