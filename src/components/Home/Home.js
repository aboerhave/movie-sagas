import React, {Component} from 'react';
import {connect} from 'react-redux';

class Home extends Component {
    
    componentDidMount = () => {
        this.getMovies();
    }

    getMovies = () => {
        
        
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