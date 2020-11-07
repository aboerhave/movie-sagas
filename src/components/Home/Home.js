import React, {Component} from 'react';
import {connect} from 'react-redux';

class Home extends Component {
    
    componentDidMount = () => {
        this.getMovies();
    }
    
    getMovies = () => {
        // need to send dispatch to saga to make get request here
        this.props.dispatch({type: "GET_ALL_MOVIES"});
    }

    render(){
        return(
            <h1>home</h1>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(Home);