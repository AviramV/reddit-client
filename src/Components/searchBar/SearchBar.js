import { useState } from 'react';
import { setTerm } from './searchBarSlice';
import { useDispatch } from 'react-redux';
import './SearchBar.css'
import { useNavigate, useSearchParams } from 'react-router-dom';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

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