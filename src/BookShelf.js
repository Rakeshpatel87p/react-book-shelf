import React, { Component } from 'react';

class BookShelf extends Component {
	render() {
      
      const { currentlyReading, wantToRead, read } = this.props;

      const bookTitles = wantToRead.map(book => (
        <li key={book.id}>
       		<p>{book.title}</p>
        </li>
      ))
		console.log(bookTitles)
    	return <ul>{bookTitles}</ul>
    }
}

export default BookShelf;