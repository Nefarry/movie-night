import React, { Component } from 'react'

class UpdateField extends Component {
  render() {
    const { movie, updateMovieHandler, updateInputHandler, state } = this.props
    return (
      <>
        {
            movie.showEditField && (
                <div className='row mt-3'>
                    <div className='col-1'>

                    </div>
                    <div className='col-9'>
                        <div>
                            <label>Edit Movie <b>#{movie.id}</b></label>
                        </div>
                        <input type='text' value={state.updateInput} onChange={updateInputHandler} />
                    </div>
                    <div className='col-2 d-flex align-items-center justify-content-center'>
                        <button className='btn btn-success' onClick={() => updateMovieHandler(movie.id)}><i className="fa-solid fa-check"></i></button>
                    </div>
                </div>
            )
        }
      </>
    )
  }
}

export default UpdateField
