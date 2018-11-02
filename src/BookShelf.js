import React, { Component } from 'react';

class BookShelf extends Component {
	render() {
      
      const { shelvedBooks } = this.props;
      console.log({shelvedBooks});

      const bookTitles = shelvedBooks.map(book => (
        <li key={book.id}>
       		<p>{book.title}</p>
        </li>
      ))
		console.log(shelvedBooks);
		console.log(bookTitles)
    	return <ul>{bookTitles}</ul>
    }
}

export default BookShelf;