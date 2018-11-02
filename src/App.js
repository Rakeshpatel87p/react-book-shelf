import React from 'react'
import { getAll } from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  //pass data via props to appropriate component
  //set propType
  
  state = {
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: [],  
  }

  componentDidMount() {
  	getAll().then((value) => {
    	value.forEach((book) => {	
          this.setState(() => (
          	this.state[book.shelf].push(book)
          ))
          //this.state[book.shelf].push(book) //for object, finding key value;
        })
    })
    .catch((err) => {
    	console.log(`Watch out captain, we have an err: ${err}`);
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          	<div>
				<BookShelf shelvedBooks={this.state.currentlyReading}/>
			</div>
        )}
      </div>
    	)
    }
}

export default BooksApp
