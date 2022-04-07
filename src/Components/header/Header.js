import logo from '../../logo.svg';
import SearchBar from '../searchBar/SearchBar';
import Filter from '../filter/Filter';

import './Header.css';

function Header() {
    return (
        <header>
            <div className="logo-container">
                <div id="logo"></div>
              {/* <img id="logo" alt="" src={logo} /> */}
            </div>
            <div className="inputs">
                <SearchBar />
                <Filter />
            </div>
        </header>
    )
}

export default Header;