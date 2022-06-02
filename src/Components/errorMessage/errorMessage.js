import { Link } from 'react-router-dom';
import './errorMessage.css';

export default function ErrorMessage({ hasError, errorCode, type }) {
    
    let directive, location;
    if (errorCode >= 500) {
        directive = "please try again later";
        location = 0;
    } else {
        directive = "they were moved or deleted";
        location = '/';
    }
    
    const message = hasError ?
        <p className="error-message-text">Couldn't load {type}, {directive}.</p> :
        <p className="error-message-text">Reddit doesn't know anything about that...<br /> Try something else!</p>;

    const emoji = hasError ? '🙅🏻‍♀️' : '🤷🏻‍♂️';
    const buttonText = hasError && errorCode >= 500 ? 'Try Again' : 'Back Home';

    return (
        <div className="error-message">
            <div className="emoji">{emoji}</div>
            {message}
            <Link className="error-button" to={location} children={buttonText}/>
        </div>
    );
}