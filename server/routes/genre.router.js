const { default: Axios } = require('axios');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/:id', (req, res) => {
  // Add query to get all genres for one movie
  const queryText = `select * from genres
  join movies_genres 
  on genres.id = movies_genres.genres_id
  join movies
  on movies.id = movies_genres.movies_id
  where movies.id = $1;`
  
  pool.query(queryText, [req.params.id]).then((result) => {
    res.send(result.rows)
  }).catch((error) => {
    console.log('error in getting movie from db', error);
    res.sendStatus(500);
  });
});

module.exports = router;