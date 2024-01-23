import React, { Component } from 'react'
import AddMovie from './AddMovie'
import MovieList from './MovieList'
import Header from './Header'
import axios from 'axios'

class Container extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        //Adding Movie
         movieList: [],
         newTitle: '',
         newDetail: '',
         newGenre: [],
         movieId: 1,

         //Update Movie
         showEditField: false,
         updateInput: '',

         //Search API
         posts: [],
         searchInput: ''
      }
    }

    //Add Movie
    //Takes the input value and saves it to its respective state property
    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //Creates an object and saves it to the movieList array
    addMovieHandler = () => {
        const { newTitle, newDetail, newGenre, movieId } = this.state
        if(newTitle.trim() !== '' || newDetail.trim() !== '' || newGenre.trim() !== null) {
            const newMovie = {
                id: movieId,
                title: newTitle,
                details: newDetail,
                genres: newGenre.split(',').map((genre) => genre.trim()),
            }

            this.setState((prevState) => ({
                movieList: [...prevState.movieList, newMovie],
                newTitle: '',
                newDetail: '',
                newGenre: '',
                movieId: movieId + 1
            }), console.log(newMovie))
        }
    }

    //UpdateField
    //Takes the input value and saves it to its respective state property
    updateInputHandler = (event) => {
        this.setState({
            updateInput: event.target.value
        })
    }

    //toggles the edit field, to show or hide depending on the id
    updateFieldHandler = (id) => {
        this.setState((prevState) => ({
            movieList: prevState.movieList.map((movie) => 
                movie.id === id ?
                //if movie.id is equal to the given id, it saves a new array with the previous value and toggles the
                //show edit field
                {...movie, showEditField: !movie.showEditField} :
                {...movie, showEditField: false}
            ),
            updateInput: ''
        }))
    }

    //Updates the matching data in the array with the new one
    updateMovieHandler = (id) => {
        const { updateInput } = this.state
        if(updateInput !== ''){
            this.setState((prevState) => ({
                movieList: prevState.movieList.map((movie) => 
                    //if movie.id is equal to the given id, saves the previous state of
                    //the array and changes the title property
                    movie.id === id ?
                    {...movie, title: this.state.updateInput} :
                    movie
                ),
                updateInput: ''
            }))
        }
    }

    //Movie List
    //Finds the id that corresponds to the given id and removes it from the array
    deleteHandler = (id) => {
        const index = this.state.movieList.findIndex((movie) => movie.id === id)
        //the findIndex method returns either the index of the value in the array or -1 if it does not exist
        if(index !== -1) {
            const movies = [...this.state.movieList]
            movies.splice(index, 1)
            this.setState({
                movieList: movies
            })
        }
    }

    //Header
    //Takes the input value and saves it to its respective state property and
    //calls a callback function that handles the http request to the API
    dropdownHandler = (event) => {
        this.setState({
            searchInput: event.target.value
        }, () => {
            const { searchInput } = this.state
            //checks if input is empty
            if(searchInput.trim() !== ''){
                axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(response => {
                    //filters the response data to check if the response data includes what the search input is looking for
                    const results = response.data.filter((result) => 
                        result.title.toLowerCase().includes(searchInput.toLowerCase())
                    )
                    this.setState({
                        posts: results
                    })
                })
                .catch(error => {
                    throw new Error('Error')
                })
            } else {
                this.setState({
                    posts: []
                })
            }
            
        })
    }

    //maps a new array that gives a selected property to the value that matches the given id
    displayResult = (id) => {
        const found = this.state.posts.map((post) => 
            post.id === id ?
            {...post, selected: true} :
            post
        )

        this.setState({
            posts: found,
            searchInput: ''
        })
    }
    
    render() {
        const { inputHandler, addMovieHandler, state, updateFieldHandler, 
                updateMovieHandler, updateInputHandler, deleteHandler, 
                dropdownHandler, displayResult } = this
        return (
        <div className='container'>
            <Header state={state} dropdownHandler={dropdownHandler} displayResult={displayResult} />
            <AddMovie inputHandler={inputHandler} 
                      state={state} 
                      addMovieHandler={addMovieHandler} />
            <MovieList state={state}
                       updateFieldHandler={updateFieldHandler}
                       updateMovieHandler={updateMovieHandler}
                       updateInputHandler={updateInputHandler}
                       deleteHandler={deleteHandler}
                       displayResult={displayResult}  />
        </div>
        )
    }
}

export default Container
