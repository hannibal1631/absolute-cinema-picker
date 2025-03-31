function MovieCard({ movie }) {
  // Handle cases where poster path might be null
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/400x600.png?text=No+Poster+Available';
    
  // Extract year from release date
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg max-w-md w-full hover:shadow-purple-900/30 hover:shadow-xl transition-shadow">
      <div className="relative">
        <img 
          src={posterUrl} 
          alt={movie.title} 
          className="w-full h-64 object-cover object-center"
        />
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-sm font-bold px-2 py-1 rounded">
          {movie.vote_average ? movie.vote_average.toFixed(1) : '?'}/10
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{movie.title} ({year})</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genres && movie.genres.map((genre) => (
            <span key={genre.id} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
              {genre.name}
            </span>
          ))}
        </div>
        <p className="text-gray-400 mb-4 line-clamp-4">{movie.overview}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span>Popularity: {movie.popularity ? movie.popularity.toFixed(0) : 'Unknown'}</span>
          </div>
          <a 
            href={`https://www.themoviedb.org/movie/${movie.id}`}
            target="_blank"
            rel="noopener noreferrer" 
            className="text-sm bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded"
          >
            More Info
          </a>
        </div>
      </div>
    </div>
  )
}

export default MovieCard

