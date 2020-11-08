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
        }
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

    returnHome = () => {
        this.props.history.push('/');
    }

    render(){
        return(
            <div className="inputDiv">
                <h2>Add a New Movie:</h2><br/>
                <label>Movie Title</label><br/>
                <input type="text" onChange={(event)=>this.handleChange(event, 'title')}/><br/>
                <label>Movie Image Location</label><br/>
                <input type="text" onChange={(event)=>this.handleChange(event, 'poster')}/><br/>
                <label >Movie Description</label><br/>
                <textarea onChange={(event)=>this.handleChange(event, 'description')}/><br/>
                <label >Movie Genre</label><br/>
                <select onChange={this.handleSelect}> 
                    <option value={0}>Genre</option>
                    {this.props.reduxState.genres.map((genre) => {
                        return (
                            <option value={genre.id}>{genre.name}</option>
                        )
                    })}
                </select><br/>
                {/* {JSON.stringify(this.state.movie)} <br/> */}
                <button className="addMovieButton" onClick={this.returnHome}>Cancel and Return to Home</button>
                <button className="addMovieButton">Save and Return to Home</button>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(AddMovie);