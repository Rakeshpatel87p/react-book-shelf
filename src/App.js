import React from 'react'
import { getAll, update } from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {
      showSearchPage: false,
      read: [],
      currentlyReading: [],
      wantToRead: []
    }
  }

  componentDidMount() {
	this.organizeBooks();
  }
 
  organizeBooks = () => {
    //{ myArray: [...this.state.myArray, 'new value'] }
    
      const bookShelves = {
      	read: [],
        currentlyReading: [],
        wantToRead: []
      }
      getAll().then((value) => {
          value.forEach((book) => {	
            const bookShelf = book.shelf;
            bookShelves[bookShelf].push(book)
          })

      	  this.setState({read: bookShelves.read, currentlyReading: bookShelves.currentlyReading, wantToRead: bookShelves.wantToRead });
      })
      .catch((err) => {
          console.log(`Watch out captain, we have an err: ${err}`);
      })
  }

  clearBookShelves = () => {
  	const resetStateValue = {
     	currentlyReading: [],
      	wantToRead: [],
        read: []
    }
    
    this.setState(resetStateValue);
  }

  bookHasMoved = (book, shelf) => {
    update(book, shelf).then((res) => {
        this.clearBookShelves();
        this.organizeBooks();
    })
    .catch((err) => {
          console.log(`Watch out captain, we have an err: ${err}`);
      })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          	<div className="list-books">
            	<div className="list-books-title">
              		<h1>MyReads</h1>
            	</div>
                <div className="list-books-content">
                    <BookShelf 
                        listOfBooks={this.state.currentlyReading}
						stateValue='currentlyReading'
						shelfValue="Currently Reading"
						bookHasMoved={this.bookHasMoved}
                    />
                    <BookShelf 
                        listOfBooks={this.state.wantToRead}
						stateValue='wantToRead'
						shelfValue="Want to Read"
						bookHasMoved={this.bookHasMoved}
                    />
                    <BookShelf 
                        listOfBooks={this.state.read}
						stateValue='read'
						shelfValue="Read"
						bookHasMoved={this.bookHasMoved}
                    />
                </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
			</div>
        )}
      </div>
    	)
    }
}

export default BooksApp
