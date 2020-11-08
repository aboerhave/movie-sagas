// This is the genre.router.js file for the Week 12 assignment for Prime Digital Academy, created by 
// Adam Boerhave, 11/5/2020 - 11/8/2020

const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// get request to get the information assocaited with one movie 
// including the genres associated with it.  It returns as many rows as 
// genres
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
  
  const queryText = `select * from genres order by id asc;`
  
  pool.query(queryText).then((result) => {
    res.send(result.rows)
  }).catch((error) => {
    console.log('error in getting genres from db', error);
    res.sendStatus(500);
  });
});

module.exports = router;