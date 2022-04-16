import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategories, fetchCategories } from './filterSlice';
import { fetchPosts } from '../posts/postsSlice';

function Filter() {
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])

    const handleChange = ({ target }) => {
        if (target.value === 'Select category...') return
        const URL = `https://www.reddit.com${target.value}.json`
        dispatch(fetchPosts(URL))
    }

    return (
    <form>
        <select id="categories" className="header-input" onChange={handleChange}>
            <option>Select category...</option>
            {
                categories.map((category, index) => {
                    const name = category.data.display_name;
                    const icon = category.data.icon_img;
                    const { url } = category.data;
                    return <option key={index} value={url} type="text">{name}</option>
                })
            }
        </select>
    </form>
    );
}

export default Filter;

