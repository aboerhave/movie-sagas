import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Details.css';

class Details extends Component {
    
    handleClick = () => {
        this.props.history.push('/');
    }

    render(){
        return(
            <div className="movieDetails">
                {/* {JSON.stringify(this.props.reduxState.individualMovieInfo)} */}
                {/* conditional rendering to make sure the array data exists first */}
                {this.props.reduxState.individualMovieInfo[0] ?
                    <> 
                        <h2 className="movieTitle">{this.props.reduxState.individualMovieInfo[0].title}</h2>
                        <br/>
                        <img src={this.props.reduxState.individualMovieInfo[0].poster} 
                        alt={this.props.reduxState.individualMovieInfo[0].title}
                        className="detailImg"/>
                        <br/>
                        {/* maps through results to find genres */}
                        {this.props.reduxState.individualMovieInfo.map((genre) => {
                            return (
                                <h4 className="movieGenre" key={genre.genres_id}>{genre.name}</h4>
                            )
                        })}
                        <p className="desc">{this.props.reduxState.individualMovieInfo[0].description}</p>
                    </>
                    :
                    <>
                        <h2 className="errorText">There is no movie data to display.<br/>
                        Please go the home page and select a movie.</h2>
                    </>
                }
                <br/>
                <button onClick={this.handleClick} className="backBtn">Return to Home Page</button>
                
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(Details);