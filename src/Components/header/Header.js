import SearchBar from '../searchBar/SearchBar';
import Filter from '../filter/Filter';

import { Link } from 'react-router-dom';

import './Header.css';

function Header() {

    return (
        <header>
            <div className="logo-container">
                <Link to="/">
                    <div id="logo"></div>
                </Link>
            </div>
            <div className="inputs">
                <SearchBar />
                <Filter />
            </div>
        </header>
    )
}

export default Header;