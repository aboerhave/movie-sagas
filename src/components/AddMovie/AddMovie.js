import React, {Component} from 'react';
import {connect} from 'react-redux';
import './AddMovie.css';

class AddMovie extends Component {
    
    componentDidMount = () => {
        this.getGenres();
    }

    getGenres = () => {
        this.props.dispatch({type: 'GET_GENRES'});
    }

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

    handleChange = (event, typeOfKey) => {
        this.setState({
            movie:{
                ...this.state.movie,
                [typeOfKey]: event.target.value
            }
        });
    }

    handleSelect = (event, typeOfKey) => {
        this.setState({
            movie:{
                ...this.state.movie,
                [typeOfKey]: event.target.value
            }
        })
    }

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

    returnHome = () => {
        this.props.history.push('/');
    }

    submitFunction = () => {
        if(!this.state.movie.title || !this.state.movie.poster || !this.state.movie.description || this.state.movie.genre1 == 0) {
            alert('Please enter all of the information before submitting the movie.')
            return;
        }
        else {
            this.props.dispatch({type: 'ADD_MOVIE', payload: this.state.movie});
            // put the history push here
        }
    }

    render(){
        return(
            <div className="inputDiv">
                <h2 className="titleText">Add a New Movie:</h2><br/>
                <h4 className="reqText">(All fields are required)</h4>
                <label>Movie Title</label><br/>
                <input type="text" onChange={(event)=>this.handleChange(event, 'title')}/><br/>
                <label>Movie Image Location</label><br/>
                <input type="text" onChange={(event)=>this.handleChange(event, 'poster')}/><br/>
                <label >Movie Description</label><br/>
                <textarea onChange={(event)=>this.handleChange(event, 'description')}/><br/>
                <label >Movie Genre (select up to 5)</label><br/>
                <select onChange={(event)=>this.handleSelect(event, "genre1")}> 
                    <option value={0}>Genre</option>
                    {this.props.reduxState.genres.map((genre) => {
                        return (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        )
                    })}
                </select><br/>

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
                {this.state.movie.numberOfGenres != 5 &&
                    <button className="addMovieButton" onClick={this.addGenre}>Add another genre</button>
                }
                {this.state.movie.numberOfGenres > 1 && 
                    <button className="addMovieButton" onClick={this.removeGenre}>Remove the last genre</button>
                }
                {JSON.stringify(this.state)} <br/>
                <button className="addMovieButton" onClick={this.returnHome}>Cancel and Return to Home</button>
                <button className="addMovieButton" onClick={this.submitFunction}>Save and Return to Home</button>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(AddMovie);