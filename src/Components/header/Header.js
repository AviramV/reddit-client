import logo from '../../logo.svg';
import SearchBar from '../searchBar/SearchBar';
import Filter from '../filter/Filter';

import './Header.css';

function Header() {
    return (
        <header>
            <div className="logo-container">
              <img id="logo" alt="" src={logo} />
            </div>
            <div>
                <SearchBar />
                <Filter />
            </div>
        </header>
    )
}

export default Header;