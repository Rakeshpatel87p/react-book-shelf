import React from 'react';
import {search} from './BooksAPI';
import BookCard from './BookCard';

class SearchBooks extends React.Component {
	state = {
      	query: ''
    }
      
    updateQuery = (userInput) => {
      this.setState(()=> ({
          query: userInput.trim()
      }))
      this.queryForBooks(this.state.query);
    }

	queryForBooks = (query) => {
		search(query, 10)
      	  .then(res => {
			!res ? console.log('Book Data has not arrived') : this.bookCards(res)
          })
    }

   bookCards = (bookResults) => {
   		const bookCards = bookResults.map((book) => {
        <BookCard 
          book={book}
          bookHasMoved={this.props.bookHasMoved}
          stateValue={this.props.stateValue}
        />
      })
    }
  
  render() {    
      const { query } = this.state;

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
					value={this.state.query}
					onChange={(event) => {this.updateQuery(event.target.value)}}/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
          	</div>
        )
    }
}

export default SearchBooks