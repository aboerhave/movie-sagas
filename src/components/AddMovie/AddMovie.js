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

    }
    render(){
        return(
            <div className="inputDiv">
                <h1>Add a New Movie:</h1><br/>
                <label>Movie Title</label><br/>
                <input type="text" /><br/>
                <label>Movie Image Location</label><br/>
                <input type="text" /><br/>
                <label >Movie Description</label><br/>
                <textarea /><br/>
                <label >Movie Genre</label><br/>
                <select> 
                    <option>Genre</option>
                    {this.props.reduxState.genres.map((genre) => {
                        return (
                            <option>{genre.name}</option>
                        )
                    })}
                </select>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(AddMovie);