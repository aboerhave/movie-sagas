import React, {Component} from 'react';
import {connect} from 'react-redux';

class Details extends Component {
    
    render(){
        return(
            <h1>details</h1>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(Details);