import React from 'react';
import BookShelfChanger from './BookShelfChanger';

class BookCard extends React.Component {
	render() {
    	const {book, bookHasMoved, stateValue} = this.props;
      	return (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" 
                           style={{ 
                                    width: 128, 
                                    height: 193, 
                                    backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}>
                      </div>
                      <BookShelfChanger 
                        stateValue={stateValue}
                        book={book}
                        bookHasMoved={bookHasMoved}
                      />
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors[0]}</div>
                  </div>
                </li>
        )
    }
}

export default BookCard;