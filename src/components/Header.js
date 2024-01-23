import React, { Component } from 'react'

class Header extends Component {
    render() {
        const { dropdownHandler, state, displayResult } = this.props
        return (
        <div className='header text-light p-4'>
            <div className='row'>
                <div className='col-8'>
                    <h4 className='m-0'>Movie Night</h4>
                </div>
                <div className='col-4'>
                    <div className="input-group mb-2">
                        <input type="text" 
                               className="form-control no-focus"
                               placeholder="Search..." 
                               onInput={dropdownHandler}
                               value={state.searchInput} />
                        <div className="input-group-text"><i className="fas fa-search"></i></div>
                        <div className=''>
                            <div className='ddown'>
                                {
                                    state.posts.map((post) => (
                                        <div className='ddown-content text-dark' 
                                             key={(post.id)} 
                                             onClick={() => displayResult(post.id)}>{post.title}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Header
