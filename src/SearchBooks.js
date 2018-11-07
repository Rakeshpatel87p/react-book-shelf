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
    	//this.queryForBooks(this.state.query)
    }
      
    updateQuery = (userInput) => {
      this.setState(() => ({
          query: userInput.trim()
      }))
      this.queryForBooks(userInput);
    }

	queryForBooks = (query) => {
		search(query)
            .then((res) => (
            	this.setState(()=> ({
      				searchedForBooks: res
    			}))
            ))
      console.log(this.state.searchedForBooks)
    }

	//console.log(this.state.searchForBooks);
  
  	render() {    
    	const { query } = this.state;
	  	const { bookHasMoved, stateValue } = this.props;
		
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
					{this.state.searchedForBooks.length > 0
                     ? this.state.searchedForBooks.forEach((book) => (
                    	<BookCard 
                            book={book}
                            bookHasMoved={this.props.bookHasMoved}
                            stateValue={this.props.stateValue}
        				/>
                    )) : console.log('no books to display')
					}
				</ol>
              </div>
          	</div>
        )
    }
}

export default SearchBooks