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
  
	componentDidMount() {
    	//this.getSearchedForBooks
    }
      
    updateQuery = (userInput) => {
      this.setState(() => ({
          query: userInput.trim(),
          searchedForBooks: this.queryForBooks(userInput) || []
      }))
      //this.queryForBooks(userInput);
    }

	queryForBooks = (query) => {
		search(query)
            .then((res) => (
            	console.log(res)
          		/*
          		this.setState(()=> ({
      				searchedForBooks: res
    			}))
                */
            ))      
          	.catch((err) => {
          		console.log(`Watch out captain, we have an err: ${err}`);
      		})
      //console.log(this.state.searchedForBooks)
    }
	/*
	getSearchedForBooks = () => (
    	this.state.searchedForBooks.map((book) => (
            <BookCard 
                book={book}
                bookHasMoved='test'
                stateValue='test'
            />
         ))
     )
	*/
	//console.log(this.state.searchForBooks);
  
  	render() {    
    	const { query, searchedForBooks } = this.state;
		
		const booksToRender = query === ''
		? console.log('no books to show')
		: searchedForBooks.map((book) => (
        	<BookCard 
            	book={book}
            	bookHasMoved='test'
            	stateValue='test'
			/>
         ))
	  	//const { bookHasMoved, stateValue } = this.props;
		//console.log(searchedForBooks);
		console.log(booksToRender);
		
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
					{booksToRender}
				</ol>
              </div>
          	</div>
        )
    }
}

export default SearchBooks