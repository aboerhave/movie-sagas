import React, {Component} from 'react';
import {connect} from 'react-redux';

class AddMovie extends Component {
    
    render(){
        return(
            <h1>add movie</h1>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(AddMovie);