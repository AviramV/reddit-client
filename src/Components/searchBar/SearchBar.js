import './SearchBar.css'

function SearchBar() {
    return (
        <form>
            <input className="header-input"
                type="search"
                name="q" 
                placeholder="Search posts...">
            </input>
        </form>
    )
}

export default SearchBar;