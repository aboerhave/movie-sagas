import React, {Component} from 'react';
import {connect} from 'react-redux';

class AddMovie extends Component {
    
    state = {
        
    }
    render(){
        return(
            <>
                <h1>add movie</h1>
                <input type="text"></input>
                <input type="text"></input>
                <textarea ></textarea>
                <select> </select>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(AddMovie);