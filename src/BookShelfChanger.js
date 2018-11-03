import React from 'react';

class BookShelfChanger extends React.Component {
	constructor(props) {
    	super(props);
      	this.state = {selectedValue: this.props.shelfValue};
      	this.handleChange = this.handleChange.bind(this);
    }
  
  	handleChange(event) {
    	this.setState({selectedValue: event.target.value});
  	}
  
  	render() {
    	return (
        	<div className="book-shelf-changer">
                <select value={this.state.selectedValue} onChange={this.handleChange}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default BookShelfChanger