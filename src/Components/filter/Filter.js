import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategories, fetchCategories } from './filterSlice';

function Filter() {
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])

    return (
    <form>
        <input
            className="header-input"
            list="categories"
            placeholder="Choose Category"
        />
        <datalist id="categories">
            {
                categories.map((category, index) => {
                    const name = category.data.display_name_prefixed;
                    return <option key={index} value={name}/>
                })
            }
        </datalist>
    </form>
    );
}

export default Filter;

