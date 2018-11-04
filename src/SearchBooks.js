import React from 'react';

class SearchBooks extends React.Component {
	state = {
      	query: ''
    }
      
    updateQuery = (userInput) => {
      this.setState(()=> ({
          query: userInput.trim()
      }))
    }
  
  render() {    
      const { query } = this.state;

      return (
       		<div className="search-books">
              <div className="search-books-bar">
                <a className="close-search" onClick={() => {this.props.returnToShelves()}}>Close</a>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author"/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
          	</div>
        )
    }
}

export default SearchBooks