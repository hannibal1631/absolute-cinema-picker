// We'll use The Movie Database (TMDB) API
const API_KEY = '31cc369f7eca8654b673e36549a7d253'; // Replace with your actual API key
const BASE_URL = `https://api.themoviedb.org/3`;

// Helper function to make API requests
const fetchFromApi = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);

  // Add API key to all requests
  url.searchParams.append('api_key', API_KEY);

  // Add additional params
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

// Get details for a specific movie including genres
const getMovieDetails = async (movieId) => {
  return fetchFromApi(`/movie/${movieId}`, { append_to_response: 'credits' });
};

// Get a random movie
export const getRandomMovie = async () => {
  try {
    // First get a popular movie to ensure we get something good
    const popularMovies = await fetchFromApi('/movie/popular', {
      page: Math.floor(Math.random() * 5) + 1,
    });

    if (!popularMovies.results || popularMovies.results.length === 0) {
      throw new Error('No movies found');
    }

    // Select a random movie from the results
    const randomIndex = Math.floor(
      Math.random() * popularMovies.results.length
    );
    const randomMovie = popularMovies.results[randomIndex];

    // Get full details for the selected movie
    return getMovieDetails(randomMovie.id);
  } catch (error) {
    console.error('Error fetching random movie:', error);
    throw error;
  }
};

// Filter movies based on user preferences
export const filterMovies = async (filters) => {
  try {
    const params = {
      sort_by: 'popularity.desc',
      include_adult: false,
      page: Math.floor(Math.random() * 3) + 1, // Get a random page from the first 3
    };

    // Add genre if specified
    if (filters.genre) {
      params.with_genres = filters.genre;
    }

    // Add year range if specified
    if (filters.year) {
      if (!isNaN(parseInt(filters.year))) {
        // Specific year
        params.primary_release_year = filters.year;
      } else {
        // Decade or range
        switch (filters.year) {
          case '2010s':
            params.primary_release_date_gte = '2010-01-01';
            params.primary_release_date_lte = '2019-12-31';
            break;
          case '2000s':
            params.primary_release_date_gte = '2000-01-01';
            params.primary_release_date_lte = '2009-12-31';
            break;
          case '1990s':
            params.primary_release_date_gte = '1990-01-01';
            params.primary_release_date_lte = '1999-12-31';
            break;
          case '1980s':
            params.primary_release_date_gte = '1980-01-01';
            params.primary_release_date_lte = '1989-12-31';
            break;
          case 'older':
            params.primary_release_date_lte = '1979-12-31';
            break;
        }
      }
    }

    // Add minimum rating if specified
    if (filters.rating) {
      params.vote_average_gte = filters.rating;
    }

    // Get movies that match the filters
    const filteredMovies = await fetchFromApi('/discover/movie', params);

    if (!filteredMovies.results || filteredMovies.results.length === 0) {
      // If no movies match, fall back to a random popular movie
      return getRandomMovie();
    }

    // Select a random movie from the filtered results
    const randomIndex = Math.floor(
      Math.random() * filteredMovies.results.length
    );
    const selectedMovie = filteredMovies.results[randomIndex];

    // Get full details for the selected movie
    return getMovieDetails(selectedMovie.id);
  } catch (error) {
    console.error('Error filtering movies:', error);
    throw error;
  }
};
