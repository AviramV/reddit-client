import SearchBar from '../searchBar/SearchBar';
import Filter from '../filter/Filter';
import { fetchPosts } from '../posts/postsSlice';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Header.css';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        navigate('/');
        dispatch(fetchPosts());
    }

    return (
        <header>
            <div className="logo-container">
                <div id="logo" onClick={handleClick}></div>
            </div>
            <div className="inputs">
                <SearchBar />
                <Filter />
            </div>
        </header>
    )
}

export default Header;