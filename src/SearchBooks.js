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
      	if (!(this.state.query === '')) {
        	search(this.state.query, 100)
              .then((books) => {
                  books.forEach((book) => {
                  	booksToShow.push(book)
                  })
          		return booksToShow
          	  })
      		  .then((booksToShow) => {
                //cross-check list here
                const favoritedBookTitles = this.props.allBookTitles;
                const test = booksToShow.forEach((book) => {
                	favoritedBookTitles.filter((b) => {
                    	console.log(`title ${b.title} compare to favoritedBookTitles ${book.title}`)
                      	b.title.includes(book.title)
                    })
                })
                const savedBooks = this.props.allBookTitles;
                booksToShow.forEach((book) => {
                	savedBooks.filter((b) => {
                    	if (b.title.includes(book.title)) {
                        	book.shelf = b.shelf
                        }
                    })	
                  
                })
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