import React, {Component} from 'react';
import {connect} from 'react-redux';

class Search extends Component {
    
    render(){
        return(
            <h1>search</h1>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(Search);