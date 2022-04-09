import { useState } from 'react';
import { setTerm } from './searchBarSlice';
import { useDispatch } from 'react-redux';
import './SearchBar.css'
import { fetchPosts } from '../posts/postsSlice';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch()

    const getTerm = (e) => {
        const trimmedTerm = e.target.value.trimStart();
        setSearchTerm(trimmedTerm);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchTerm) return;
        dispatch(setTerm(searchTerm));
        const searchURIBase = `https://www.reddit.com/search.json?q=`;
        const encodedTerm = encodeURI(searchTerm);
        dispatch(fetchPosts(`${searchURIBase}${encodedTerm}`));
        setSearchTerm('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className="header-input"
                onChange={getTerm}
                value={searchTerm}
                type="search"
                required
                placeholder="Search posts...">
            </input>
        </form>
    )
}

export default SearchBar;