import { useDispatch } from 'react-redux';
import { fetchPosts } from '../posts/postsSlice';
import { Link, useNavigate } from 'react-router-dom';
import './errorMessage.css';

export default function ErrorMessage({ hasError, type }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const message = hasError ?
        <p className="error-message">Couldn't load {type}, please try again later.</p> :
        <p className="error-message">Reddit doesn't know anything about that...<br /> Try something else!</p>;

    const emoji = hasError ? '🙅🏻‍♀️' : '🤷🏻‍♂️';
    const buttonText = hasError ? 'Try Again' : 'Back Home';

    const handleClick = () => navigate(0);

    return (
        <>
            <div className="emoji">{emoji}</div>
            {message}
            <button type="button" onClick={handleClick}>{buttonText}</button>
        </>
    );
}