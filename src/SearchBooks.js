import React from 'react';
import {search} from './BooksAPI';
import BookCard from './BookCard';
import { Link } from 'react-router-dom';

class SearchBooks extends React.Component {
    constructor(props) {
    	super(props);
      	this.state = {
    		query: '',
      		searchedForBooks: []
    	}
	}
      
    updateQuery = (userInput) => {
      this.setState(() => ({
          query: userInput
      }))
      this.findQueriedBooks(userInput);
    }

    findQueriedBooks = (userInput) => {
        search(this.state.query, 100)
            .then((booksToShow) => {
                //cross-check list here
                const savedBooks = this.props.allBookTitles;
                if (booksToShow.length > 0) {
                    booksToShow.forEach((book) => {
                        savedBooks.filter((b) => {
                            if (b.title.includes(book.title)) {
                                book.shelf = b.shelf
                            }
                        })
                    })

                  //create bookcards for modified books
                  const bookCards = booksToShow.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      bookHasMoved={this.props.bookHasMoved}
                      stateValue={!book.shelf ? 'none' : book.shelf}
                    />
                  ))

                  this.setState({ searchedForBooks: bookCards }); 
                }                  
            })
  }

	resetBookGrid = () => {
    	this.setState({query: '', searchedForBooks: []})
    }

  	render() {    
    	const { query, searchedForBooks } = this.state;
		
    return (
       		<div className="search-books">
              <div className="search-books-bar">
      			<Link to="/" className="close-search">
      				Close
      			</Link>
                <div className="search-books-input-wrapper">
                  <input 
					type="text" 
					placeholder="Search by title or author"
					value={query}
					onChange={(event) => {
                     event.target.value === "" 
                      ? this.resetBookGrid()
					  : this.updateQuery(event.target.value);

					}}/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
					{searchedForBooks}
				</ol>
              </div>
          	</div>
        )
    }
}

export default SearchBooks