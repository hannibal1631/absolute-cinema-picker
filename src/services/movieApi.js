// We are using The Movie Database (TMDB) API
const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = '31cc369f7eca8654b673e36549a7d253';

// Helper function to make API requests
const fetchFromApi = async (endpoint, params = {}) => {
  try {
    // Check if BASE_URL is defined and properly formatted
    if (!BASE_URL) {
      throw new Error(
        'BASE_URL is undefined. Check your environment variables.'
      );
    }

    // Ensure endpoint starts with a slash if not already present
    const formattedEndpoint = endpoint.startsWith('/')
      ? endpoint
      : `/${endpoint}`;

    // Create URL with proper error checking
    let url;
    try {
      url = new URL(`${BASE_URL}${formattedEndpoint}`);
    } catch (urlError) {
      console.error('Invalid URL construction:', BASE_URL, formattedEndpoint);
      throw new Error(
        `Failed to construct URL: ${BASE_URL}${formattedEndpoint}`
      );
    }

    // Add API key to all requests
    if (!API_KEY) {
      throw new Error(
        'API_KEY is undefined. Check your environment variables.'
      );
    }
    url.searchParams.append('api_key', API_KEY);

    // Add additional params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null)
        url.searchParams.append(key, value);
    });

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

// Get details for a specific movie including genres
const getMovieDetails = async (movieId) => {
  try {
    return await fetchFromApi(`/movie/${movieId}`, {
      append_to_response: 'credits',
    });
  } catch (error) {
    console.error(`Error getting details for movie ${movieId}:`, error);
    throw error;
  }
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
    return await getMovieDetails(randomMovie.id);
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
      try {
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
            default:
              console.warn(`Unrecognized year filter: ${filters.year}`);
          }
        }
      } catch (yearError) {
        console.error('Error processing year filter:', yearError);
        // Continue without the year filter
      }
    }

    // Add minimum rating if specified
    if (filters.rating) {
      params.vote_average_gte = filters.rating;
    }

    // Get movies that match the filters
    const filteredMovies = await fetchFromApi('/discover/movie', params);

    if (!filteredMovies.results || filteredMovies.results.length === 0) {
      console.warn(
        'No movies matched filters, falling back to random popular movie'
      );
      // If no movies match, fall back to a random popular movie
      return await getRandomMovie();
    }

    // Select a random movie from the filtered results
    const randomIndex = Math.floor(
      Math.random() * filteredMovies.results.length
    );
    const selectedMovie = filteredMovies.results[randomIndex];

    // Get full details for the selected movie
    return await getMovieDetails(selectedMovie.id);
  } catch (error) {
    console.error('Error filtering movies:', error);
    throw error;
  }
};
