import React, {useState} from 'react';
import './SearchBar.css'

export const SearchBar = ({onSearch}) => {
    
    const [searchTerm, setSearchTerm] = useState('');

    const search = (event) => {
        event.preventDefault();
        onSearch(searchTerm)
    }

    const handleTermChange = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div className="SearchBar">
        <form onSubmit={search}>
            <input onChange={handleTermChange} placeholder="Enter A Song, Album, or Artist" />
            <button type='submit' className="SearchButton">SEARCH</button>
        </form>
        </div>
    );
}