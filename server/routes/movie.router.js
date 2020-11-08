const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    const createdMovieId = result.rows[0].id;
     
    console.log('req.body.numberOfGenres', req.body.numberOfGenres);
    
    
    let insertMovieGenreQuery = '';
    switch(req.body.numberOfGenres) {
      case 1: 
        insertMovieGenreQuery = `
        insert into movies_genres (movies_id, genres_id)
        VALUES  ($1, $2);
        `
            // SECOND QUERY MAKES GENRE FOR THAT NEW MOVIE
        pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre1]).then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
        });    
        break;
      case 2:
        insertMovieGenreQuery = `
        insert into movies_genres (movies_id, genres_id)
        VALUES  ($1, $2), ($1, $3);
        `
        pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre1, req.body.genre2]).then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
        });    
        break;
      case 3:
        insertMovieGenreQuery = `
        insert into movies_genres (movies_id, genres_id)
        VALUES  ($1, $2), ($1, $3), ($1, $4);
        `
        pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre1, req.body.genre2, req.body.genre3]).then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
        })    
        break;
      case 4:
        insertMovieGenreQuery = `
        insert into movies_genres (movies_id, genres_id)
        VALUES  ($1, $2), ($1, $3), ($1, $4), ($1, $5);
        `
        pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre1, req.body.genre2, req.body.genre3, req.body.genre4]).then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
        });    
          break;
      case 5:
        insertMovieGenreQuery = `
        insert into movies_genres (movies_id, genres_id)
        VALUES  ($1, $2), ($1, $3), ($1, $4), ($1, $5), ($1, ($6));
        `
        pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre1, req.body.genre2, req.body.genre3, req.body.genre4, req.body.genre5]).then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
        });    
          break;
    }
  }).catch(err => {  // Catch for first query
    console.log(err);
    res.sendStatus(500)
  })  // end of first query catch
})  // end of entire post

router.get('/', (req,res) => {
  let queryText = `select * from movies order by title asc;`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
    
  }).catch((error) => {
    console.log('error in router get all movies request', error);    
    res.sendStatus(500);
  });
})

module.exports = router;