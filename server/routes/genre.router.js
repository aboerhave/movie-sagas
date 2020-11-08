// const { default: Axios } = require('axios');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/:id', (req, res) => {
  // this query gets all the information for one movie
  // later, it is used for printing title, poster, and looping through 
  // for genres
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

// this request gets all the genres that exist in the genres table in 
// the database
router.get('/', (req, res) => {
  
  const queryText = `select name from genres;`
  
  pool.query(queryText).then((result) => {
    res.send(result.rows)
  }).catch((error) => {
    console.log('error in getting genres from db', error);
    res.sendStatus(500);
  });
});

module.exports = router;