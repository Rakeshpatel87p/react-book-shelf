import React, { Component } from 'react';
import BookShelfChanger from './BookShelfChanger';

class BookShelf extends Component {
	render() {
      
      const { listOfBooks } = this.props;
    

      const bookCards = listOfBooks.map(book => (
        <li>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
			  <BookShelfChanger 
              	shelfValue = {this.props.stateValue}
         	  />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors[0]}</div>
          </div>
        </li>
      ))

    	return (
        	<div className="bookshelf">
            	<h2 className="bookshelf-title">{this.props.shelfValue}</h2>
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