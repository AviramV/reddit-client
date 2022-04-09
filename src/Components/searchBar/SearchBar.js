import { useState } from 'react';
import { setTerm } from './searchBarSlice';
import { useDispatch } from 'react-redux';
import './SearchBar.css'
import { fetchPosts } from '../posts/postsSlice';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch()

    const getTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setTerm(searchTerm));
        const encodedTerm = encodeURI(searchTerm);
        dispatch(fetchPosts(`https://www.reddit.com/search.json?q=${encodedTerm}`));
        setSearchTerm('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className="header-input"
                onChange={getTerm}
                value={searchTerm}
                type="search"
                name="q" 
                placeholder="Search posts...">
            </input>
        </form>
    )
}

export default SearchBar;