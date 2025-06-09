// BingeBuddy - JavaScript
// This script handles all the functionality for the movie and TV show recommendation app

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
const genreSelectElement = document.getElementById('genres');
const minRatingInput = document.getElementById('minRating');
const minRatingValueSpan = document.getElementById('minRatingValue');
const applyFiltersBtn = document.getElementById('applyFiltersBtn');
const filterSelection = document.getElementById('filterSelection');

// ========== STATE MANAGEMENT ==========
let trendingContent = []; // Will hold either movies or TV shows
let currentContentIndex = 0;
let likedMovies = [];
let likedTvShows = [];
let currentContentType = 'movie'; // 'movie' or 'tv'
let allGenres = { movie: [], tv: [] }; // Store genres for both types

// ========== API FUNCTIONS ==========
const getGenres = async (type) => {
    const genreRequestEndpoint = `/genre/${type}/list`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.genres;
        } else {
            console.error(`Failed to fetch ${type} genres. Status:`, response.status);
            console.error('Response:', await response.text());
            return []; // Return empty array on failure
        }
    } catch (error) {
        console.error(`Error fetching ${type} genres:`, error);
        return []; // Return empty array on error
    }
};

const getMovieTrailer = async (contentId, type) => {
    const trailerEndpoint = `/${type}/${contentId}/videos`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${trailerEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const trailers = jsonResponse.results;
            const officialTrailer = trailers.find(trailer => trailer.type === 'Trailer' && trailer.site === 'YouTube');
            return officialTrailer ? `https://www.youtube.com/embed/${officialTrailer.key}` : '';
        } else {
            console.error(`Failed to fetch ${type} trailer. Status:`, response.status);
            console.error('Response:', await response.text());
            return '';
        }
    } catch (error) {
        console.error('Error fetching movie trailer:', error);
        return '';
    }
};

const getFilteredContent = async (type, genreId, minRating) => {
    let endpoint = `/discover/${type}`;
    let requestParams = `?api_key=${tmdbKey}&vote_count.gte=100`; // Ensure a minimum number of votes for reliable ratings

    if (genreId) {
        requestParams += `&with_genres=${genreId}`;
    }
    if (minRating > 0) {
        requestParams += `&vote_average.gte=${minRating}`;
    }
    
    // Add sorting for better randomization with filters
    requestParams += `&sort_by=popularity.desc`; // Start with popular, then randomize client-side

    const urlToFetch = `${tmdbBaseUrl}${endpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.results;
        } else {
            console.error(`Failed to fetch filtered ${type} content. Status:`, response.status);
            console.error('Response:', await response.text());
            return [];
        }
    } catch (error) {
        console.error(`Error fetching filtered ${type} content:`, error);
        return [];
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
        const randomIndex = Math.floor(Math.random() * trendingContent.length); // Randomize
        currentContentIndex = randomIndex;
        const content = trendingContent[currentContentIndex];
        displayContent(content);
    } else {
        movieInfo.classList.add('hidden');
        alert('No content found with the current filters. Please adjust your selections.');
    }
};

const renderLikedList = (list, element) => {
    element.innerHTML = '';
    if (list.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No liked items yet.';
        element.appendChild(li);
    } else {
        list.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.title || item.name;
            element.appendChild(li);
        });
    }
};

// ========== HELPER FUNCTIONS ==========
const populateGenreDropdown = (genres) => {
    genreSelectElement.innerHTML = '<option value="" selected>All Genres</option>'; // Reset and add default
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelectElement.appendChild(option);
    });
};

// ========== INITIALISATION & EVENT HANDLERS ==========
const loadContent = async (type) => {
    currentContentType = type;

    // Fetch and populate genres for the current type
    const genres = await getGenres(type);
    if (genres) {
        allGenres[type] = genres;
        populateGenreDropdown(genres);
    }

    // Apply current filters
    const selectedGenreId = genreSelectElement.value;
    const minRating = parseFloat(minRatingInput.value);

    trendingContent = await getFilteredContent(type, selectedGenreId, minRating);
    
    // Randomize the initial display
    if (trendingContent.length > 0) {
        currentContentIndex = Math.floor(Math.random() * trendingContent.length);
        displayContent(trendingContent[currentContentIndex]);
        movieInfo.classList.remove('hidden');
        filterSelection.classList.remove('hidden'); // Ensure filter section is visible
        console.log(`App ready! Showing trending ${type}s.`);
    } else {
        movieInfo.classList.add('hidden'); // Hide movie info if no content
        console.error(`Failed to load trending ${type}s or no content found with current filters`);
        alert(`Failed to load trending ${type}s or no content found with current filters. Please check your internet connection or adjust filters.`);
    }

    // Update liked lists visibility
    if (type === 'movie') {
        likedMoviesSection.classList.remove('hidden');
        likedTvShowsSection.classList.add('hidden');
        renderLikedList(likedMovies, likedMoviesList);
    } else {
        likedMoviesSection.classList.add('hidden');
        likedTvShowsSection.classList.remove('hidden');
        renderLikedList(likedTvShows, likedTvShowsList);
    }

    // Update active toggle button
    moviesBtn.classList.toggle('active', type === 'movie');
    tvShowsBtn.classList.toggle('active', type === 'tv');
};

// Event Listeners
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
    const content = trendingContent[currentContentIndex];
    const trailerUrl = await getMovieTrailer(content.id, currentContentType);
    if (trailerUrl) {
        trailerIframe.src = trailerUrl;
        trailerModal.classList.remove('hidden');
    } else {
        alert('No trailer available for this content.');
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

minRatingInput.addEventListener('input', () => {
    minRatingValueSpan.textContent = parseFloat(minRatingInput.value).toFixed(1);
});

applyFiltersBtn.addEventListener('click', () => {
    loadContent(currentContentType); // Reload content with new filters
});

moviesBtn.addEventListener('click', () => loadContent('movie'));
tvShowsBtn.addEventListener('click', () => loadContent('tv'));

// Initial load
console.log('Initialising BingeBuddy...');
minRatingValueSpan.textContent = parseFloat(minRatingInput.value).toFixed(1); // Set initial rating display
loadContent('movie'); // Load movies by default
