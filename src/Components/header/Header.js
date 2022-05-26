import SearchBar from '../searchBar/SearchBar';
import Filter from '../filter/Filter';

import { Link } from 'react-router-dom';

import './Header.css';

function Header() {

    return (
        <header>
            <div className="logo-container">
                <Link to="/">
                    <div id="logo">
                        <svg id="logo-icon" width="64" height="64" viewBox="0 0 384 512">
                            <path id="logo-path" d="M31.92,15.523h338.2q20.664,0,20.664,28.387,0,11.629-8.954,20.863L196.2,260.066,353.584,425.944l28.585-72.85,12.054,154.25L244.755,495.716l74.389-36.938L148.325,276.141q-4.822-5.13-4.822-20.863,0-9.234,16.875-26.677l156.7-163.826H56.716v439.15q0,23.6-23.419,23.6-23.074,0-23.074-23.257V35.36Q10.223,15.523,31.92,15.523Z"/>
                        </svg>


                    </div>
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