// This is the Details.js file for the Week 12 assignment for Prime Digital Academy, created by 
// Adam Boerhave, 11/5/2020 - 11/8/2020

import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Details.css';

class Details extends Component {
    
    // function to handle button click to return to home page
    handleClick = () => {
        this.props.history.push('/');
    }

    render(){
        return(
            <div className="movieDetails">
                {/* conditional rendering to make sure the array data exists first */}
                {/* The reducer contains as many rows as genres associated with movie, and only looks 
                in the first element for title, picture, and description location and loops through the genres to print */}
                {this.props.reduxState.individualMovieInfo[0] ?
                    <> 
                        <h2 className="movieTitle">{this.props.reduxState.individualMovieInfo[0].title}</h2>
                        <br/>
                        <img src={this.props.reduxState.individualMovieInfo[0].poster} 
                        alt={this.props.reduxState.individualMovieInfo[0].title}
                        className="detailImg"/>
                        <br/>
                        {/* maps through results to find genres in the reducer that had info 
                        put in it from the get request on the home page */}
                        {this.props.reduxState.individualMovieInfo.map((genre) => {
                            return (
                                <h4 className="movieGenre" key={genre.genres_id}>{genre.name}</h4>
                            )
                        })}
                        <p className="desc">{this.props.reduxState.individualMovieInfo[0].description}</p>
                    </>
                    :
                    <>
                        <h2 className="errorText">There is no movie data to display.<br/>
                        Please go the home page and select a movie.</h2>
                    </>
                }
                <br/>
                {/* button to return to home page */}
                <button onClick={this.handleClick} className="backBtn">Return to Home Page</button>
                
            </div>
        )
    }
}

// Redux
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(Details);