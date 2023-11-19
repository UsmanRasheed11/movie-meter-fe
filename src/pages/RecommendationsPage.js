
import React from 'react';
import { Typography } from '@mui/material';

const RecommendationsPage = () => {
  return (
    <div>
      <h1>Recommendations Page</h1>
      <Typography variant="body1">
        To view recommendations, please <a href="/login">login</a>.
      </Typography>
    </div>
  );
};

export default RecommendationsPage;
