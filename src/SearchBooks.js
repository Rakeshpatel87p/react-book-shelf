import React from 'react';
import {search} from './BooksAPI';
import BookCard from './BookCard';
import { Link } from 'react-router-dom';

class SearchBooks extends React.Component {
    constructor(props) {
    	super(props);
      	this.state = {
    		query: '',
      		searchedForBooks: []
    	}
    }
      
    updateQuery = (userInput) => {
      this.setState(() => ({
          query: userInput.trim()
      }))
    }

	findQueriedBooks = (userInput) => {
   	 	const booksToShow = [];
      
      	this.state.query === ''
        	? [] //reset array
      		: search(this.state.query, 100)
              .then((books) => { // arrow then () is an implicit return => { return ()}
                  books.forEach((book) => {
                  	booksToShow.push(book)
                  })
          		return booksToShow
          	  })
      		  .then((booksToShow) => {
				const allBookTitles = this.props.allBookTitles;
         		//filter books based on title, then pass that shelfValue to stateValue
          		const bookTitlesFromSearch = booksToShow.map((b) => (b.title))
          		const bookCards = booksToShow.map((book) => (
                  		<BookCard
                  			key={book.id}
                  			book={book}
                  			bookHasMoved={this.props.bookHasMoved}
                  			stateValue={!book.shelf ? 'none' : book.shelf}
						/>
                ))
				console.log(bookCards)
                this.setState({searchedForBooks: bookCards});
        	  })
      } 
  
  	render() {    
    	const { query, searchedForBooks } = this.state;
		
    return (
       		<div className="search-books">
              <div className="search-books-bar">
      			<Link to="/" className="close-search">
      				Close
      			</Link>
                <div className="search-books-input-wrapper">
                  <input 
					type="text" 
					placeholder="Search by title or author"
					value={query}
					onChange={(event) => {
                      this.updateQuery(event.target.value);
					  this.findQueriedBooks(event.target.value);
					}}/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
					{searchedForBooks}
				</ol>
              </div>
          	</div>
        )
    }
}

export default SearchBooks