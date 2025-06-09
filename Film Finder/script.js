// Film Finder - JavaScript
// This script handles all the functionality for the movie recommendation app

// ========== API CONFIGURATION ==========
const tmdbKey = '957eb9f35f75e767e2e0f393b293b0a0';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

// ========== DOM ELEMENTS ==========
const movieInfo = document.getElementById('movieInfo');
const moviePoster = document.getElementById('moviePoster');
const movieTitle = document.getElementById('movieTitle');
const movieReleaseDate = document.getElementById('movieReleaseDate');
const movieRating = document.getElementById('movieRating');
const movieOverview = document.getElementById('movieOverview');
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const trailerBtn = document.getElementById('trailerBtn');
const trailerModal = document.getElementById('trailerModal');
const trailerIframe = document.getElementById('trailerIframe');
const closeBtn = document.querySelector('.close-btn');
const likedMoviesList = document.getElementById('likedMoviesList');

// ========== STATE MANAGEMENT ==========
let trendingMovies = [];
let currentMovieIndex = 0;
let likedMovies = [];

// ========== MOVIE FETCHING FUNCTIONS ==========
const getMovieTrailer = async (movieId) => {
    const trailerEndpoint = `/movie/${movieId}/videos`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${trailerEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const trailers = jsonResponse.results;
            const officialTrailer = trailers.find(trailer => trailer.type === 'Trailer' && trailer.site === 'YouTube');
            return officialTrailer ? `https://www.youtube.com/embed/${officialTrailer.key}` : '';
        }
    } catch (error) {
        console.error('Error fetching movie trailer:', error);
    }
};

const getTrendingMovies = async () => {
    const trendingEndpoint = '/trending/movie/week';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${trendingEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.results;
        }
    } catch (error) {
        console.error('Error fetching trending movies:', error);
    }
};

// ========== DISPLAY FUNCTIONS ==========
const displayMovie = (movieData) => {
    movieInfo.classList.remove('hidden');

    const posterPath = movieData.poster_path;
    const posterUrl = posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : 'https://via.placeholder.com/300x450?text=No+Poster';
    moviePoster.style.backgroundImage = `url(${posterUrl})`;

    movieTitle.textContent = movieData.title;
    movieReleaseDate.textContent = `Released: ${movieData.release_date}`;
    movieRating.textContent = `Rating: ${movieData.vote_average.toFixed(1)} / 10`;
    movieOverview.textContent = movieData.overview || 'No overview available.';
};

const showNextMovie = () => {
    if (trendingMovies.length > 0) {
        currentMovieIndex = (currentMovieIndex + 1) % trendingMovies.length;
        const movie = trendingMovies[currentMovieIndex];
        displayMovie(movie);
    }
};

const renderLikedMovies = () => {
    likedMoviesList.innerHTML = '';
    likedMovies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        likedMoviesList.appendChild(li);
    });
};

// ========== EVENT LISTENERS ==========
likeBtn.addEventListener('click', () => {
    const movie = trendingMovies[currentMovieIndex];
    if (!likedMovies.find(likedMovie => likedMovie.id === movie.id)) {
        likedMovies.push(movie);
        renderLikedMovies();
    }
    showNextMovie();
});
dislikeBtn.addEventListener('click', showNextMovie);

trailerBtn.addEventListener('click', async () => {
    const movie = trendingMovies[currentMovieIndex];
    const trailerUrl = await getMovieTrailer(movie.id);
    if (trailerUrl) {
        trailerIframe.src = trailerUrl;
        trailerModal.classList.remove('hidden');
    } else {
        alert('No trailer available for this movie.');
    }
});

closeBtn.addEventListener('click', () => {
    trailerModal.classList.add('hidden');
    trailerIframe.src = ''; // Stop video playback
});

window.addEventListener('click', (event) => {
    if (event.target === trailerModal) {
        trailerModal.classList.add('hidden');
        trailerIframe.src = ''; // Stop video playback
    }
});

// ========== INITIALISATION ==========
window.addEventListener('DOMContentLoaded', async () => {
    console.log('Initialising Film Finder...');
    trendingMovies = await getTrendingMovies();
    if (trendingMovies && trendingMovies.length > 0) {
        displayMovie(trendingMovies[currentMovieIndex]);
        console.log('App ready! Showing trending movies.');
    } else {
        console.error('Failed to load trending movies');
        alert('Failed to load trending movies. Please check your internet connection and refresh the page.');
    }
});
