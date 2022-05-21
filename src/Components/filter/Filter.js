import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategories, fetchCategories, setCategory, selectCurrentCategory } from './filterSlice';
import { useNavigate } from "react-router-dom";

function Filter() {
    const categories = useSelector(selectCategories);
    const currentCategory = useSelector(selectCurrentCategory);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const handleChange = ({ target }) => {
        if (target.value === 'Select category...') return;
        dispatch(setCategory(target.value));
        navigate(`category/${target.value}`);
    }

    return (
        <form>
            <select id="categories" className="header-input" onChange={handleChange} value={ currentCategory || "" }>
                <option>Select category...</option>
                {
                    categories.map((category) => {
                        const name = category.data.display_name;
                        const { url } = category.data;
                        return <option key={name} value={name} type="text">{name}</option>
                    })
                }
            </select>
        </form>
    );
}

export default Filter;

