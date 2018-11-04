import React from 'react';
import { getAll, update } from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {
      showSearchPage: true,
      read: [],
      currentlyReading: [],
      wantToRead: []
    }
  }

  componentDidMount() {
	this.organizeBooks();
  }
 
  organizeBooks = () => {

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

  returnToShelves = () => {
  	this.setState({ showSearchPage: false })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
       		
       		<SearchBooks returnToShelves={this.returnToShelves} />
       
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
