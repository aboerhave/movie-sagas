import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery("GET_ALL_MOVIES", getMovies);
    yield takeEvery('GET_ONE_MOVIE', getOneMovie);
}

// this function gets all the movies from the database, but only includes id,
// title, poster address, and description text
function* getMovies() {
    try {
        const allMovieResponse = yield axios.get('/api/movie');
        yield put({type: 'ALL_MOVIES_FROM_DB', payload: allMovieResponse.data});
    }
    catch (error) {
        console.log('error', error);
    }
}

// this function gets the individual data for the movie clicked on, including
// as many rows as there are genres associated with the movie selected, so the 
// genres returned in each row are different and the rest of the information 
// is the same on all the rows
function* getOneMovie(action) {
    try {
        const singleMovieResponse = yield axios.get(`/api/genre/${action.payload}`);
        console.log('singleMovieResponse.data', singleMovieResponse.data);
        
        yield put({type: 'ONE_MOVIE_FROM_DB', payload: singleMovieResponse.data});
        
    }
    catch (error) {
        console.log('error', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store all movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'ALL_MOVIES_FROM_DB':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// used to store all of the movie data for one movie
const individualMovieInfo = (state = [], action) => {
    switch(action.type) {
        case 'ONE_MOVIE_FROM_DB':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        individualMovieInfo
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
