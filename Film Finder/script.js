// Film Finder - JavaScript
// This script handles all the functionality for the movie recommendation app

// ========== API CONFIGURATION ==========
// Task 1: Save your TMDB API key
const tmdbKey = '957eb9f35f75e767e2e0f393b293b0a0';

// Task 2: Save the TMDB base URL
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

// ========== DOM ELEMENTS ==========
// Get references to all the HTML elements we'll need to manipulate
const genreSelectElement = document.getElementById('genres');
const playBtn = document.getElementById('playBtn');
const movieInfo = document.getElementById('movieInfo');
const moviePoster = document.getElementById('moviePoster');
const movieTitle = document.getElementById('movieTitle');
const movieOverview = document.getElementById('movieOverview');
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const genreSelection = document.getElementById('genreSelection');

// ========== GENRE FUNCTIONS ==========
// Task 3-12: Fetch genres from TMDB API
const getGenres = async () => {
    // Task 3: Create the genres endpoint
    const genreRequestEndpoint = '/genre/movie/list';
    
    // Task 4: Create query parameters with our API key
    const requestParams = `?api_key=${tmdbKey}`;
    
    // Task 5: Combine everything into the full URL
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
    
    // Task 7: Add try/catch for error handling
    try {
        // Task 8: Fetch data from the API
        const response = await fetch(urlToFetch);
        
        // Task 9: Check if the response is successful
        if (response.ok) {
            // Task 10: Convert response to JSON
            const jsonResponse = await response.json();
            
            // Task 11: Extract genres array from the response
            const genres = jsonResponse.genres;
            console.log('Genres fetched:', genres); // For learning: see what we got
            
            // Task 12: Return the genres
            return genres;
        }
    } catch (error) {
        // Task 7: Log any errors
        console.error('Error fetching genres:', error);
    }
};

// ========== MOVIE FETCHING FUNCTIONS ==========
// Task 13-17: Fetch movies based on selected genre
const getMovies = async () => {
    // Get the selected genre from our dropdown
    const selectedGenre = getSelectedGenre();
    
    // Task 13: Create the discover movie endpoint
    const discoverMovieEndpoint = '/discover/movie';
    
    // Task 14: Create query parameters with API key and selected genre
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    
    // Combine into full URL
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
    
    // Task 15: Make function async and add try/catch
    try {
        // Fetch movies from the API
        const response = await fetch(urlToFetch);
        
        // Task 16: Check if response is successful
        if (response.ok) {
            // Convert to JSON
            const jsonResponse = await response.json();
            console.log('Movies response:', jsonResponse); // For learning
            
            // Task 17: Extract movies array and return it
            const movies = jsonResponse.results;
            console.log('Movies found:', movies.length); // For learning
            return movies;
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

// Task 18-23: Get detailed information about a specific movie
const getMovieInfo = async (movie) => {
    // Task 18: Extract movie ID from the movie object
    const movieId = movie.id;
    
    // Task 19: Create the movie details endpoint
    const movieEndpoint = `/movie/${movieId}`;
    
    // Task 20: Create query parameters and URL
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
    
    // Task 21: Make async and add try/catch
    try {
        // Fetch movie details
        const response = await fetch(urlToFetch);
        
        // Task 22: Check if response is successful
        if (response.ok) {
            // Convert to JSON
            const movieInfo = await response.json();
            console.log('Movie info:', movieInfo); // For learning
            
            // Task 23: Return the movie info
            return movieInfo;
        }
    } catch (error) {
        console.error('Error fetching movie info:', error);
    }
};

// ========== DISPLAY FUNCTIONS ==========
// Task 24-27: Main function to show a random movie
const showRandomMovie = async () => {
    // Task 24: Get all movies for the selected genre
    const movies = await getMovies();
    
    // Task 25: Pick a random movie from the list
    const randomMovie = getRandomMovie(movies);
    
    // Task 26: Get detailed info about the random movie
    const info = await getMovieInfo(randomMovie);
    
    // Task 27: Display the movie on the page
    displayMovie(info);
};

// ========== HELPER FUNCTIONS ==========
// Get the selected genre from the dropdown
const getSelectedGenre = () => {
    const selectedGenre = genreSelectElement.value;
    return selectedGenre;
};

// Get a random movie from the movies array
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
};

// Display movie information on the page
const displayMovie = (movieInfo) => {
    // Hide genre selection and show movie info
    genreSelection.classList.add('hidden');
    movieInfo.classList.remove('hidden');
    
    // Set movie poster
    const posterPath = movieInfo.poster_path;
    const posterUrl = posterPath 
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : 'https://via.placeholder.com/300x450?text=No+Poster';
    moviePoster.style.backgroundImage = `url(${posterUrl})`;
    
    // Set movie title and overview
    movieTitle.textContent = movieInfo.title;
    movieOverview.textContent = movieInfo.overview || 'No overview available.';
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
    // Clear movie details
    moviePoster.style.backgroundImage = '';
    movieTitle.textContent = '';
    movieOverview.textContent = '';
};

// Handle liking a movie
const likeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();
};

// Handle disliking a movie
const dislikeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();
};

// Populate the genre dropdown with options
const populateGenreDropdown = (genres) => {
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelectElement.appendChild(option);
    });
};

// ========== EVENT LISTENERS ==========
// When play button is clicked
playBtn.addEventListener('click', () => {
    const selectedGenre = getSelectedGenre();
    if (selectedGenre) {
        showRandomMovie();
    } else {
        alert('Please select a genre first!');
    }
});

// When like button is clicked
likeBtn.addEventListener('click', likeMovie);

// When dislike button is clicked
dislikeBtn.addEventListener('click', dislikeMovie);

// ========== INITIALISATION ==========
// When the page loads, fetch and populate genres
window.addEventListener('DOMContentLoaded', async () => {
    const genres = await getGenres();
    if (genres) {
        populateGenreDropdown(genres);
        console.log('App ready! Select a genre and click "Let\'s Play!"');
    }
});
