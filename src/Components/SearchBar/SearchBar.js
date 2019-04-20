import React from 'react'
import './SearchBar.css'

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            term: ''
        }
    }

    search(term) {
        this.props.onSearch(term);
    }

    handleTermChange(e) {
        this.setState({
            term: e.target.value
        })
    }

    handleClick(e) {
        this.search(this.state.term);
    }

    render() {
        return (
            <div className="SearchBar">
                <input 
                    placeholder="Enter A Song, Album, or Artist" 
                    onChange={this.handleTermChange}/>
                <a onClick={this.handleClick}>SEARCH</a>
            </div>
        )
    }
}