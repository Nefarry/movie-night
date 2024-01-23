import React, { Component } from 'react'
import UpdateField from './UpdateField'

class MovieList extends Component {
    render() {
        const { state, updateFieldHandler, updateMovieHandler, updateInputHandler, deleteHandler } = this.props
        const result = state.posts.find((post) => post.selected)
        return (
        <div className='p-2'>
            {
                state.movieList.map((movie) => (
                    <div key={movie.id} className='border border-1 border-secondary rounded p-2'>
                        <div className='row'>
                            <div className='col-1 d-flex align-items-center justify-content-center'>
                                <label className='fw-bold fs-5'>#{movie.id}</label>
                            </div>
                            <div className='col-9'>
                                <label className='fs-5 text-break'>{movie.title}</label>
                                <p className='m-0 text-break'><b>Details:</b> {movie.details}</p>
                                <p className='m-0 text-break'><b>Genres:</b> {movie.genres.join(', ')}</p>
                            </div>
                            <div className='col-2 d-flex align-items-center justify-content-center'>
                                <button className='btn btn-warning me-2' onClick={() => updateFieldHandler(movie.id)}><i className="fas fa-edit"></i></button>
                                <button className='btn btn-danger' onClick={() => deleteHandler(movie.id)}><i className="fa fa-trash"></i></button>
                            </div>
                        </div>
                        <UpdateField movie={movie} 
                                     updateMovieHandler={updateMovieHandler} 
                                     updateInputHandler={updateInputHandler}
                                     state={state} />
                    </div>
                ))
            }

            {
                result && (
                    <div>
                        <p>{result.title}</p>
                    </div>
                )
            }
        </div>
        )
    }
}

export default MovieList
