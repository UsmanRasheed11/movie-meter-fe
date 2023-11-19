import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Modal, Box, Rating, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from '../components/auth/AuthContext';
import api from '../services/api';

const MovieCard = styled(Card)({
  maxWidth: 345,
  margin: '1rem',
  cursor: 'pointer',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const RatingModalContent = styled(Box)({
  backgroundColor: '#fff',
  border: '2px solid #000',
  borderRadius: '8px',
  padding: '1.5rem',
  maxWidth: '25rem',
  margin: 'auto',
});

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const { user, loginModalOpen, setLoginModalOpen } = useAuth();

  useEffect(() => {
    api('/movies')
      .then((response) => setMovies(response.data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  const handleRatingClick = (movie) => {
    setSelectedMovie(movie);
    setUserRating(movie.userRating || 0);
    if (user) {
      setRatingModalOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleCloseRatingModal = () => {
    setRatingModalOpen(false);
  };

  const handleRateMovie = () => {
    api(`/ratings/${selectedMovie._id}/${userRating}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include the user's token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful rating submission
        console.log('Rating submitted successfully:', data);
      })
      .catch((error) => console.error('Error submitting rating:', error))
      .finally(() => {
        setRatingModalOpen(false);
        setSelectedMovie(null);
      });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {movies.map((movie) => (
        <MovieCard key={movie._id} onClick={() => handleRatingClick(movie)}>
          <CardMedia
            component="img"
            alt={movie.title}
            height="140"
            image={`https://source.unsplash.com/345x140/?movie,${movie.title}`}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {movie.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {movie.category.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="textSecondary" component="span">
                Average Rating: {movie.averageRating || 'N/A'}
              </Typography>
              <Rating
                name={`rating-${movie._id}`}
                value={movie.userRating || 0}
                readOnly
                precision={0.5}
                size="small"
                sx={{ ml: 1 }}
              />
            </Box>
          </CardContent>
        </MovieCard>
      ))}
      <Modal open={ratingModalOpen} onClose={handleCloseRatingModal}>
        <RatingModalContent>
          <Typography variant="h6" component="div" gutterBottom>
            Rate {selectedMovie?.title}
          </Typography>
          <Rating
            name="user-rating"
            value={userRating}
            onChange={(event, newValue) => setUserRating(newValue)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleRateMovie}>
            Submit Rating
          </Button>
        </RatingModalContent>
      </Modal>
    </div>
  );
};

export default MoviePage;
