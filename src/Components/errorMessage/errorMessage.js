import './errorMessage.css';

export default function ErrorMessage({ hasError }) {
    const message = hasError ?
            <p className="error-message">Couldn't load posts, please try again later.</p> :
            <p className="error-message">Reddit doesn't know anything about that...<br/> Try something else!</p>;

    const emoji = hasError ? '🙅🏻‍♀️' : '🤷🏻‍♂️';
    const buttonText = hasError ? 'Try Again' : 'Back Home'

    return (
            <>
              <div className="emoji">{emoji}</div>
              {message}
              <button type="button">{buttonText}</button>
            </>
    );
}