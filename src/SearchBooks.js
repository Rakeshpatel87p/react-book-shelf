import React from 'react';
import {search} from './BooksAPI';
import BookCard from './BookCard';

class SearchBooks extends React.Component {
    constructor(props) {
    	super(props);
      	this.state = {
    		query: '',
      		searchedForBooks: []
    	}
    }
  
	componentDidUpdate() {
      	console.log('updated');
      	const booksToShow = []
      	this.state.query
        ? search(this.state.query, 100)
      		.then((books) => {
          		console.log(books);
          		books.forEach(book => {
           			booksToShow.push(book)
                  	//booksToShow.push(bookCard)
                })
                console.log('books to show ', booksToShow);
          		this.setState({searchedForBooks: booksToShow})
        })
		: console.log('No search to conduct captain');
    }
      
    updateQuery = (userInput) => {
      this.setState(() => ({
          query: userInput.trim()
      }))
    }
	queryForBooks = (query) => {
    	query
      	? search(query, 100)
      		.then((res) => {
          		//res.json();
          		console.log(res)
          		console.log(res.json)
        	})
      	: console.log('nada')
    }

	getSearchedForBooks = () => (
    	this.state.searchedForBooks.map((book) => (
            <BookCard 
                book={book}
                bookHasMoved='test'
                stateValue='test'
            />
         ))
    )

	//console.log(this.state.searchForBooks);
  
  	render() {    
    	const { query, searchedForBooks } = this.state;
		/*
		const booksToRender = query === ''
		? console.log('no books to show')
		: searchedForBooks.map((book) => (
          	<li>{book.title}</li>
         ))
         */
	  	//const { bookHasMoved, stateValue } = this.props;
		//console.log(searchedForBooks);
		//console.log(booksToRender);
		
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
                <ol className="books-grid">
					{this.getSearchedForBooks}
				</ol>
              </div>
          	</div>
        )
    }
}

export default SearchBooks