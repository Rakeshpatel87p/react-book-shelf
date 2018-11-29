import React, { Component } from 'react';
import BookCard from './BookCard'

class BookShelf extends Component {
  	render() {
      
    	const { listOfBooks, bookHasMoved, stateValue, shelfValue } = this.props;
  		const bookCards = listOfBooks.map((book) =>
            	<BookCard
                  key={book.id}
                  book={book}
                  bookHasMoved={bookHasMoved}
                  stateValue={stateValue}
				/>
           )
    	return (
        	<div className="bookshelf">
            	<h2 className="bookshelf-title">{shelfValue}</h2>
            	<div className="bookshelf-books">
                    <ol className="books-grid">
                      {bookCards}
					</ol>
				</div>
			</div>
        )
    }
}

export default BookShelf;