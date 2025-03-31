// src/components/FilterPanel.jsx
import { useState } from 'react';

function FilterPanel({ onSubmit, onRandom, loading }) {
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '5',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filters);
  };

  return (
    <div className='bg-gray-800 rounded-lg p-6 shadow-lg'>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='genre' className='block text-sm font-medium mb-2'>
            Genre
          </label>
          <select
            id='genre'
            name='genre'
            value={filters.genre}
            onChange={handleChange}
            className='w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
          >
            <option value=''>Any Genre</option>
            <option value='28'>Action</option>
            <option value='12'>Adventure</option>
            <option value='16'>Animation</option>
            <option value='35'>Comedy</option>
            <option value='80'>Crime</option>
            <option value='99'>Documentary</option>
            <option value='18'>Drama</option>
            <option value='10751'>Family</option>
            <option value='14'>Fantasy</option>
            <option value='36'>History</option>
            <option value='27'>Horror</option>
            <option value='10402'>Music</option>
            <option value='9648'>Mystery</option>
            <option value='10749'>Romance</option>
            <option value='878'>Science Fiction</option>
            <option value='10770'>TV Movie</option>
            <option value='53'>Thriller</option>
            <option value='10752'>War</option>
            <option value='37'>Western</option>
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor='year' className='block text-sm font-medium mb-2'>
            Release Year
          </label>
          <select
            id='year'
            name='year'
            value={filters.year}
            onChange={handleChange}
            className='w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
          >
            <option value=''>Any Year</option>
            <option value='2024'>2024</option>
            <option value='2023'>2023</option>
            <option value='2022'>2022</option>
            <option value='2021'>2021</option>
            <option value='2020'>2020</option>
            <option value='2010s'>2010s</option>
            <option value='2000s'>2000s</option>
            <option value='1990s'>1990s</option>
            <option value='1980s'>1980s</option>
            <option value='older'>Older Classics</option>
          </select>
        </div>

        <div className='mb-6'>
          <label htmlFor='rating' className='block text-sm font-medium mb-2'>
            Minimum Rating: {filters.rating}
          </label>
          <input
            id='rating'
            name='rating'
            type='range'
            min='1'
            max='10'
            step='0.5'
            value={filters.rating}
            onChange={handleChange}
            className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600'
          />
          <div className='flex justify-between text-xs text-gray-500 mt-1'>
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        <div className='flex space-x-4'>
          <button
            type='submit'
            disabled={loading}
            className='flex-1 bg-purple-600 hover:bg-purple-700 transition-colors text-white font-medium py-3 px-4 rounded-lg disabled:opacity-50'
          >
            Find Movies
          </button>
          <button
            type='button'
            onClick={onRandom}
            disabled={loading}
            className='flex-1 bg-gray-700 hover:bg-gray-600 transition-colors text-white font-medium py-3 px-4 rounded-lg disabled:opacity-50'
          >
            Random
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterPanel;
