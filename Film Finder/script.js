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
const likedTvShowsList = document.getElementById('likedTvShowsList');
const moviesBtn = document.getElementById('moviesBtn');
const tvShowsBtn = document.getElementById('tvShowsBtn');
const likedMoviesSection = document.getElementById('likedMovies');
const likedTvShowsSection = document.getElementById('likedTvShows');

// ========== STATE MANAGEMENT ==========
let trendingContent = []; // Will hold either movies or TV shows
let currentContentIndex = 0;
let likedMovies = [];
let likedTvShows = [];
let currentContentType = 'movie'; // 'movie' or 'tv'

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

const getTrendingContent = async (type) => {
    const trendingEndpoint = `/trending/${type}/week`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${trendingEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.results;
        }
    } catch (error) {
        console.error(`Error fetching trending ${type}:`, error);
    }
};

// ========== DISPLAY FUNCTIONS ==========
const displayContent = (contentData) => {
    movieInfo.classList.remove('hidden');

    const posterPath = contentData.poster_path;
    const posterUrl = posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : 'https://via.placeholder.com/300x450?text=No+Poster';
    moviePoster.style.backgroundImage = `url(${posterUrl})`;

    movieTitle.textContent = contentData.title || contentData.name;
    movieReleaseDate.textContent = `Released: ${contentData.release_date || contentData.first_air_date || 'N/A'}`;
    movieRating.textContent = `Rating: ${contentData.vote_average ? contentData.vote_average.toFixed(1) : 'N/A'} / 10`;
    movieOverview.textContent = contentData.overview || 'No overview available.';
};

const showNextContent = () => {
    if (trendingContent.length > 0) {
        currentContentIndex = (currentContentIndex + 1) % trendingContent.length;
        const content = trendingContent[currentContentIndex];
        displayContent(content);
    }
};

const renderLikedList = (list, element) => {
    element.innerHTML = '';
    list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.title || item.name;
        element.appendChild(li);
    });
};

// ========== EVENT LISTENERS ==========
likeBtn.addEventListener('click', () => {
    const content = trendingContent[currentContentIndex];
    if (currentContentType === 'movie') {
        if (!likedMovies.find(likedItem => likedItem.id === content.id)) {
            likedMovies.push(content);
            renderLikedList(likedMovies, likedMoviesList);
        }
    } else { // currentContentType === 'tv'
        if (!likedTvShows.find(likedItem => likedItem.id === content.id)) {
            likedTvShows.push(content);
            renderLikedList(likedTvShows, likedTvShowsList);
        }
    }
    showNextContent();
});
dislikeBtn.addEventListener('click', showNextContent);

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
const loadContent = async (type) => {
    currentContentType = type;
    trendingContent = await getTrendingContent(type);
    currentContentIndex = 0; // Reset index when changing content type

    if (trendingContent && trendingContent.length > 0) {
        displayContent(trendingContent[currentContentIndex]);
        console.log(`App ready! Showing trending ${type}s.`);
    } else {
        console.error(`Failed to load trending ${type}s`);
        alert(`Failed to load trending ${type}s. Please check your internet connection and refresh the page.`);
    }

    // Update liked lists visibility
    if (type === 'movie') {
        likedMoviesSection.classList.remove('hidden');
        likedTvShowsSection.classList.add('hidden');
    } else {
        likedMoviesSection.classList.add('hidden');
        likedTvShowsSection.classList.remove('hidden');
    }

    // Update active toggle button
    moviesBtn.classList.toggle('active', type === 'movie');
    tvShowsBtn.classList.toggle('active', type === 'tv');
};

moviesBtn.addEventListener('click', () => loadContent('movie'));
tvShowsBtn.addEventListener('click', () => loadContent('tv'));

window.addEventListener('DOMContentLoaded', async () => {
    console.log('Initialising Film Finder...');
    await loadContent('movie'); // Load movies by default
});
