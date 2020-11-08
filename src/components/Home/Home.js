// This is the Home.js file for the Week 12 assignment for Prime Digital Academy, created by 
// Adam Boerhave, 11/5/2020 - 11/8/2020

import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Home.css';

class Home extends Component {
    
    // page load function to call the getMovies function to get all the movies in the db
    componentDidMount = () => {
        this.getMovies();
    }
    
    // function to get all the movies in the db
    getMovies = () => {
        // need to send dispatch to saga to make get request here
        this.props.dispatch({type: "GET_ALL_MOVIES"});
    }

    // function for when the picture is clicked on the get the data associated with that movie,
    // store it in a reducer and go to the details page
    pictureClick = (movieId) => {
        console.log('movie clicked', movieId);
        this.props.dispatch({type: 'GET_ONE_MOVIE', payload: movieId});
        // the app needs to load the other component here (details page)
        // programmatical routing
        this.props.history.push('/Details');
    }

    render(){
        return(
            <>
                <h2 className="topText">Click a movie image for more details</h2>
                <br/>
                {/* loops through all the movies returned from the database and displays 
                title and picture as a button */}
                {this.props.reduxState.movies.map((movie) => {
                    return (
                        <div key={movie.id} className="card">
                            <h3>{movie.title}</h3>
                            <button className="picButton" style={{backgroundImage:`url(${movie.poster})`}} onClick={()=>this.pictureClick(movie.id)}></button>
                        </div>
                    )
                })}
            </>
        )
    }
}

// Redux
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(Home);