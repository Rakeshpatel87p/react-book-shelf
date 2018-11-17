import React from 'react';
import {search} from './BooksAPI';
//import BookCard from './BookCard';

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
        	? this.setState({searchedForBooks: booksToShow}) //reset array
      		: search(this.state.query, 100)
              .then((books) => {
                  books.forEach((book) => {
                  	booksToShow.push(book)
                  })
           		  this.setState({searchedForBooks: booksToShow})
              	  console.log('books to show ', booksToShow);   
          	  })
      } 
  
  	render() {    
    	const { query, searchedForBooks } = this.state;
		
    return (
       		<div className="search-books">
              <div className="search-books-bar">
                <a 
        			className="close-search" 
        			onClick={() => {this.props.returnToShelves()}}>Close
				</a>
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
					{searchedForBooks.map(book => (
                    	<li key={book.id}>
                      		<p>{book.title}</p>
                      	</li>
                    ))}
				</ol>
              </div>
          	</div>
        )
    }
}

export default SearchBooks