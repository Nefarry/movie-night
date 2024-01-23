import React, { Component } from 'react'

class AddMovie extends Component {
  render() {
        const { inputHandler, state, addMovieHandler } = this.props
        return (
        <div className='p-4 shadow mt-3 mb-3'>
            <div className='form-group'>
                <input type='text' 
                    placeholder='Movie title'
                    name='newTitle' 
                    className='form-control'
                    onChange={inputHandler}
                    value={state.newTitle} />
            </div>
            <div className='row mt-2 mb-2'>
                <div className='col-6'>
                    <textarea placeholder='Details'
                              name='newDetail' 
                              className='form-control'
                              onChange={inputHandler}
                              value={state.newDetail}></textarea>
                </div>
                <div className='col-6'>
                    <textarea placeholder='Genres (separated by comma)'
                              name='newGenre' 
                              className='form-control'
                              onChange={inputHandler}
                              value={state.newGenre}></textarea>
                </div>
            </div>
            <div className='text-end'>
                <button className='btn btn-primary'
                        onClick={addMovieHandler}>Add Movie</button>
            </div>
        </div>
        )
    }
}

export default AddMovie
