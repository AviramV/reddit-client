function Filter() {
    return (
    <form>
        <input
            className="header-input"
            list="categories"
            placeholder="Choose Category"
        />
        <datalist id="categories">
            <option value="cat 1"/>
            <option value="cat 2"/>
            <option value="cat 3"/>
            <option value="cat 4"/>
        </datalist>
    </form>
    );
}

export default Filter;

