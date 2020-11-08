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
            genre: ''
        },
        numberOfGenres: 1
    }

    handleChange = (event, typeOfKey) => {
        this.setState({
            movie:{
                ...this.state.movie,
                [typeOfKey]: event.target.value
            }
        });
    }

    handleSelect = (event) => {
        this.setState({
            movie:{
                ...this.state.movie,
                genre: event.target.value
            }
        })
    }

    addGenre = () => {
        if (this.state.numberOfGenres != 5) {
        this.setState({numberOfGenres: this.state.numberOfGenres + 1});
        }
    }

    removeGenre = () => {
        this.setState({numberOfGenres: this.state.numberOfGenres - 1});
    }

    returnHome = () => {
        this.props.history.push('/');
    }

    submitFunction = () => {
        if(!this.state.movie.title || !this.state.movie.poster || !this.state.movie.description || this.state.movie.genre == 0) {
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
                <select onChange={this.handleSelect}> 
                    <option value={0}>Genre</option>
                    {this.props.reduxState.genres.map((genre) => {
                        return (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        )
                    })}
                </select><br/>
                {this.state.numberOfGenres >= 2 &&
                <>
                    <select onChange={this.handleSelect}> 
                    <option value={0}>Genre</option>
                    {this.props.reduxState.genres.map((genre) => {
                        return (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        )
                    })}
                    </select><br/>
                </>
                }
                {this.state.numberOfGenres >= 3 &&
                <>
                    <select onChange={this.handleSelect}> 
                    <option value={0}>Genre</option>
                    {this.props.reduxState.genres.map((genre) => {
                        return (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        )
                    })}
                    </select><br/>
                </>
                }
                {this.state.numberOfGenres >= 4 &&
                    <>
                        <select onChange={this.handleSelect}> 
                        <option value={0}>Genre</option>
                        {this.props.reduxState.genres.map((genre) => {
                            return (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            )
                        })}
                        </select><br/>
                    </>
                    }                
                    {this.state.numberOfGenres >= 5 &&
                        <>
                            <select onChange={this.handleSelect}> 
                            <option value={0}>Genre</option>
                            {this.props.reduxState.genres.map((genre) => {
                                return (
                                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                                )
                            })}
                            </select><br/>
                        </>
                        }   
                        {this.state.numberOfGenres != 5 &&
                            <button onClick={this.addGenre}>Add another genre</button>
                        }
                        {this.state.numberOfGenres > 1 && 
                            <button onClick={this.removeGenre}>Remove the last genre</button>
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