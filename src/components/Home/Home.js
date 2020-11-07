import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Home.css';

class Home extends Component {
    
    componentDidMount = () => {
        this.getMovies();
    }
    
    getMovies = () => {
        // need to send dispatch to saga to make get request here
        this.props.dispatch({type: "GET_ALL_MOVIES"});
    }

    pictureClick = (movieId) => {
        console.log('movie clicked', movieId);
        this.props.dispatch({type: 'GET_ONE_MOVIE', payload: movieId});
        // the app needs to load the other component here (details page)
        // programmatical routing
        this.props.history.push('/Details');
    }

    render(){
        return(
            <>
                <h1>home</h1>
                {/* {JSON.stringify(this.props.reduxState.movies)} */}
                {this.props.reduxState.movies.map((movie) => {
                    return (
                        <div key={movie.id} className="card">
                            <h3>{movie.title}</h3>
                            <button className="picButton" style={{backgroundImage:`url(${movie.poster})`}} onClick={()=>this.pictureClick(movie.id)}></button>
                        </div>
                    )
                })}
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(Home);