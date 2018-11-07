import React from 'react';
import {search} from './BooksAPI';
import BookCard from './BookCard';

class SearchBooks extends React.Component {
	constructor(props) {
    	super(props);

    }
  
    state = {
    	query: '',
      	searchedForBooks: []
    }

	componentDidMount() {
    	this.queryForBooks(this.state.query)
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
          	.catch((err) => {
          		console.log(`Watch out captain, we have an err: ${err}`);
      		})
      console.log(this.state.searchedForBooks)
    }

	listOfReturnedBooks = () => (
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
    	const { query } = this.state;
	  	//const { bookHasMoved, stateValue } = this.props;
		
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
					{this.listOfReturnedBooks}
				</ol>
              </div>
          	</div>
        )
    }
}

export default SearchBooks