import { useState, useRef } from 'react';
import { setTerm } from './searchBarSlice';
import { useDispatch } from 'react-redux';
import './SearchBar.css'
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchInput = useRef();

    const getTerm = (e) => {
        const trimmedTerm = e.target.value.trimStart();
        setSearchTerm(trimmedTerm);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchTerm) return;
        dispatch(setTerm(searchTerm));
        navigate({
            pathname: 'search/',
            search: `q=${searchTerm}`
        })
        setSearchTerm('');
        searchInput.current.blur();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div id="search">
                <input className="header-input search-bar"
                    ref={searchInput}
                    onChange={getTerm}
                    value={searchTerm}
                    type="search"
                    required
                    placeholder="Search posts...">
                </input>
                <svg aria-hidden="true" className="icon-search" width="18" height="18" viewBox="0 0 18 18">
                    <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path>
                </svg>
            </div>
        </form>
    )
}

export default SearchBar;