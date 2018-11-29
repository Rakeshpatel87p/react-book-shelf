import React from 'react';
import { getAll, update } from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';
import { Link, Route } from 'react-router-dom';

class BooksApp extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {
      read: [],
      currentlyReading: [],
      wantToRead: [],
      allTitles: []
    }
  }

  componentDidMount() {
	this.organizeBooks();
  }
 
  organizeBooks = () => {
      const bookShelves = {
      	read: [],
        currentlyReading: [],
        wantToRead: [],
        allTitles: []
      }
      getAll().then((value) => {
          value.forEach((book) => {	
            const bookShelf = book.shelf;
            bookShelves[bookShelf].push(book);
            bookShelves.allTitles.push({title: book.title, shelf: book.shelf})
          })

      	  this.setState({
              read: bookShelves.read, 
              currentlyReading: bookShelves.currentlyReading, 
              wantToRead: bookShelves.wantToRead,
              allTitles: bookShelves.allTitles
          });
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
    this.state.allTitles.filter((b) => {
    	if (!(b.title.includes(book.title))) {
        	    update(book, shelf).then((res) => {
                this.clearBookShelves();
                this.organizeBooks();
            })
            .catch((err) => {
                  console.log(`Watch out captain, we have an err: ${err}`);
            })
        }
    })
    /*
    update(book, shelf).then((res) => {
        this.clearBookShelves();
        this.organizeBooks();
    })
    .catch((err) => {
          console.log(`Watch out captain, we have an err: ${err}`);
    })
    */
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
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
				  <Link to='/search'>Add a book</Link>
                </div>
			</div>
    	)} />
		<Route path='/search' render={() => (
        	<SearchBooks
      			bookHasMoved={this.bookHasMoved}
				allBookTitles={this.state.allTitles}/>
        )} />
  
      </div>
    	)
    }
}

export default BooksApp
