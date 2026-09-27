import React from 'react';

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : '/no-movie.png';

  console.log('MovieCard:', title, 'poster_path:', poster_path, 'imageUrl:', imageUrl);

  return (
    <div className="movie-card w-72">
      <img
        src={imageUrl}
        alt={title}
        className="w-full aspect-[2/3] object-cover rounded-t"
        onError={(e) => {
          console.error('Image failed to load:', e.target.src);
          e.target.src = '/no-movie.png';
        }}
      />

      <div className="p-3">
        <h3 className="text-white font-semibold truncate">{title}</h3>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <div className="rating flex items-center gap-1">
            <img src="/star.svg" alt="" className="w-4 h-4" />
            <p className="text-white">{vote_average ? vote_average.toFixed(1) : 'NN'}</p>
          </div>
          <span className="text-white">•</span>
          <p className="lang text-white capitalize">{original_language}</p>
          <span className="text-white">•</span>
          <p className="year text-white">{release_date ? release_date.split('-')[0] : 'NA'}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
