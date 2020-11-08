// This is the AddMovie.js file for the Week 12 assignment for Prime Digital Academy, created by 
// Adam Boerhave, 11/5/2020 - 11/8/2020

import React, {Component} from 'react';
import {connect} from 'react-redux';
import './AddMovie.css';

class AddMovie extends Component {
    
    // page load will call function get genres to use on this component
    componentDidMount = () => {
        this.getGenres();
    }

    // function gets genres from db to use in drop down menus
    getGenres = () => {
        this.props.dispatch({type: 'GET_GENRES'});
    }

    // initial local state for component
    state = {
        movie: {
            title: '',
            poster: '',
            description: '', 
            genre1: '', 
            genre2: '', 
            genre3: '',
            genre4: '',
            genre5: '',
            numberOfGenres: 1
        },
        lastGenre: 1
    }

    // changes text inputs for local state from the imput box for 
    // title, picture location, and description
    handleChange = (event, typeOfKey) => {
        this.setState({
            movie:{
                ...this.state.movie,
                [typeOfKey]: event.target.value
            }
        });
    }

    // applies drop down value selected to proper key in movie object
    handleSelect = (event, typeOfKey) => {
        this.setState({
            movie:{
                ...this.state.movie,
                [typeOfKey]: event.target.value
            }
        })
    }

    // add another drop down box if new genre input requested
    addGenre = () => {
        if (this.state.movie.numberOfGenres != 5) {
        this.setState({
            movie:{
                ...this.state.movie,
                numberOfGenres: this.state.movie.numberOfGenres + 1
            },
            lastGenre: this.state.lastGenre + 1
        })
    }}

    // removes last drop down box if less genre input requested
    removeGenre = () => {
        let genreToRemove ='genre' + this.state.lastGenre;
        console.log('genreToRemove', genreToRemove);
        
        this.setState({
            movie:{
                ...this.state.movie,
                numberOfGenres: this.state.movie.numberOfGenres - 1,
                [genreToRemove]: ''
            },
            lastGenre: this.state.lastGenre - 1
        });
    }

    // fired when cancel button clicked to reset the state and go to the home page
    returnHome = () => {
        this.setState({
            movie: {
                title: '',
                poster: '',
                description: '', 
                genre1: '', 
                genre2: '', 
                genre3: '',
                genre4: '',
                genre5: '',
                numberOfGenres: 1
            },
            lastGenre: 1
        })
        this.props.history.push('/');
    }

    // submitFunction is called when the save button is clicked to check inputs and, if ok,
    // send the data to the db and return to the homepage
    submitFunction = () => {
        
        // this part makes sure all the initial data is entered and leaves the function if not
        if (!this.state.movie.title || !this.state.movie.poster || !this.state.movie.description || this.state.movie.genre1 == "") {
            alert('Please enter all of the information before submitting the movie.')
            return;
        }
        else {   // This giant section checks to see if there are any genre duplicates
            // check for if 5 genres entered to make sure none of the genres are duplicated in the dropdowns
            if (this.state.movie.genre5 != '') {
                console.log('in genre5');
                if((this.state.movie.genre1 == this.state.movie.genre2) || (this.state.movie.genre1 == this.state.movie.genre3) ||
                (this.state.movie.genre1 == this.state.movie.genre4) || (this.state.movie.genre1 == this.state.movie.genre5) ||
                (this.state.movie.genre2 == this.state.movie.genre3) || (this.state.movie.genre2 == this.state.movie.genre4) ||
                (this.state.movie.genre2 == this.state.movie.genre5) || (this.state.movie.genre3 == this.state.movie.genre4) ||
                (this.state.movie.genre3 == this.state.movie.genre5) || (this.state.movie.genre4 == this.state.movie.genre5)) {
                    alert("Make sure the genres are not duplicated");
                    return
                }
            }   // end if for 5 genres
            // check for if 4 genres entered to make sure none of the genres are duplicated in the dropdowns
            else if (this.state.movie.genre4 != '') {
                console.log('in genre4');
                
                if((this.state.movie.genre1 == this.state.movie.genre2) || (this.state.movie.genre1 == this.state.movie.genre3) ||
                (this.state.movie.genre1 == this.state.movie.genre4) || (this.state.movie.genre2 == this.state.movie.genre3) || 
                (this.state.movie.genre2 == this.state.movie.genre4) || (this.state.movie.genre3 == this.state.movie.genre4)) {
                    alert("Make sure the genres are not duplicated");
                    return
                }
            }   // end else if for 4 genres
            // check for if 3 genres entered to make sure none of the genres are duplicated in the dropdowns
            else if (this.state.movie.genre3 != '') {
                console.log('in genre3');
                if((this.state.movie.genre1 == this.state.movie.genre2) || (this.state.movie.genre1 == this.state.movie.genre3) ||
                (this.state.movie.genre2 == this.state.movie.genre3)) {
                    alert("Make sure the genres are not duplicated");
                    return
                }
            }   // end else if for 3 genres
            // check for if 2 genres entered to make sure the genres are duplicated in the dropdowns
            else if (this.state.movie.genre2 != '') {
                console.log('in genre2');
                if(this.state.movie.genre1 == this.state.movie.genre2) {
                    alert("Make sure the genres are not duplicated");
                    return
                }
            }   // end else if for 2 genres
            // data should be ok here, and it gets sent to the database
            this.props.dispatch({type: 'ADD_MOVIE', payload: this.state.movie});
            // history push to go back to the home page
            this.props.history.push('/');
        }
    }   // end submit function

    render(){
        return(
            <div className="inputDiv">
                <h2 className="titleText">Add a New Movie:</h2><br/>
                <h4 className="reqText">(All fields are required)</h4>
                <label>Movie Title</label><br/>
                <input className="addMovieInput" type="text" onChange={(event)=>this.handleChange(event, 'title')} placeholder="Title"/><br/>
                <label>Movie Image Location</label><br/>
                <input className="addMovieInput" type="text" onChange={(event)=>this.handleChange(event, 'poster')} placeholder="Path to Image Location"/><br/>
                <label >Movie Description</label><br/>
                <textarea onChange={(event)=>this.handleChange(event, 'description')} placeholder="Movie Description"/><br/>
                <label >Movie Genre (select up to 5)</label><br/>
                <select onChange={(event)=>this.handleSelect(event, "genre1")}> 
                    <option value={0}>Genre</option>
                    {this.props.reduxState.genres.map((genre) => {
                        return (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        )
                    })}
                </select><br/>
                {/* add another drop down if the button is clicked */}
                {this.state.movie.numberOfGenres >= 2 &&
                    <>
                        <select onChange={(event)=>this.handleSelect(event, "genre2")}> 
                        <option value="">Genre</option>
                        {this.props.reduxState.genres.map((genre) => {
                            return (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            )
                        })}
                        </select><br/>
                    </>
                }
                {/* add another drop down if the button is clicked */}
                {this.state.movie.numberOfGenres >= 3 &&
                    <>
                        <select onChange={(event)=>this.handleSelect(event, "genre3")}> 
                        <option value="">Genre</option>
                        {this.props.reduxState.genres.map((genre) => {
                            return (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            )
                        })}
                        </select><br/>
                    </>
                }
                {/* add another drop down if the button is clicked */}
                {this.state.movie.numberOfGenres >= 4 &&
                    <>
                        <select onChange={(event)=>this.handleSelect(event, "genre4")}> 
                        <option value="">Genre</option>
                        {this.props.reduxState.genres.map((genre) => {
                            return (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            )
                        })}
                        </select><br/>
                    </>
                }                
                {/* add another drop down if the button is clicked */}
                {this.state.movie.numberOfGenres >= 5 &&
                    <>
                        <select onChange={(event)=>this.handleSelect(event, "genre5")}> 
                        <option value="">Genre</option>
                        {this.props.reduxState.genres.map((genre) => {
                            return (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            )
                        })}
                        </select><br/>
                    </>
                }   
                {/* conditional rendering to add a button to add a genre dropdowns until 5 */}
                {this.state.movie.numberOfGenres != 5 &&
                    <button className="addMovieButton" onClick={this.addGenre}>Add another genre</button>
                }
                {/* conditional rendering to add a button to remove a genre dropdown if more than 1 */}
                {this.state.movie.numberOfGenres > 1 && 
                    <button className="addMovieButton" onClick={this.removeGenre}>Remove the last genre</button>
                }
                <br/>
                {/* {JSON.stringify(this.state)} <br/> */}
                {/* cancel button */}
                <button className="addMovieButton" onClick={this.returnHome}>Cancel and Return to Home</button>
                {/* save button to submit data to db */}
                <button className="addMovieButton" onClick={this.submitFunction}>Save and Return to Home</button>
            </div>
        )
    }
}

// Redux
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(AddMovie);