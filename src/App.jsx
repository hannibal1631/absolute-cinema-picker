import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieCard from './components/MovieCard';
import FilterPanel from './components/FilterPanel';
import { getRandomMovie, filterMovies } from './services/movieApi';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRandomMovie = async () => {
    try {
      setLoading(true);
      setError(null);
      const movie = await getRandomMovie();
      setSelectedMovie(movie);
    } catch (err) {
      setError('Failed to fetch a random movie. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = async (filters) => {
    try {
      setLoading(true);
      setError(null);
      const movie = await filterMovies(filters);
      setSelectedMovie(movie);
    } catch (err) {
      setError(
        'Failed to fetch movies with the selected filters. Please try again.'
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-grow container mx-auto px-4 py-8'>
        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <h2 className='text-2xl font-bold mb-6 text-purple-400'>
              Find Your Next Movie
            </h2>
            <FilterPanel
              onSubmit={handleFilterSubmit}
              onRandom={handleRandomMovie}
              loading={loading}
            />
          </div>
          <div className='flex items-center justify-center'>
            {loading ? (
              <div className='flex flex-col items-center'>
                <div className='w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin'></div>
                <p className='mt-4 text-gray-400'>
                  Finding the perfect movie...
                </p>
              </div>
            ) : error ? (
              <div className='bg-red-900/30 border border-red-500 rounded-lg p-6 text-center'>
                <h3 className='text-xl font-semibold mb-2 text-red-400'>
                  Error
                </h3>
                <p className='text-gray-300 mb-4'>{error}</p>
                <button
                  onClick={handleRandomMovie}
                  className='px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors'
                >
                  Try Again
                </button>
              </div>
            ) : selectedMovie ? (
              <MovieCard movie={selectedMovie} />
            ) : (
              <div className='bg-gray-800 rounded-lg p-8 text-center'>
                <h3 className='text-xl font-semibold mb-4'>
                  Ready to discover?
                </h3>
                <p className='text-gray-400 mb-6'>
                  Use the filters or hit the random button to get started
                </p>
                <button
                  onClick={handleRandomMovie}
                  className='px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors'
                >
                  Surprise Me!
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
