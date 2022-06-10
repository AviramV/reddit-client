import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import './ReadMore.css'

function ReadMore({ children, limit = 200 }) {
    const [isFullText, setFullText] = useState(false);
    const textLength = children.length;
    const buttonText = isFullText ? '<< Show less' : 'Read more >>';

    const handleClick = () => {
        if (!children || textLength <= limit) return;
        setFullText(!isFullText)
    }

    return (
        <>
            <ReactMarkdown
                linkTarget={"_blank"}
                remarkPlugins={[remarkGfm]}>
                {!isFullText && textLength > limit ? children.substring(0, limit) + '...' : children}
            </ReactMarkdown>
            {
                textLength > limit &&
                <span
                    className="read-more"
                    onClick={handleClick}>
                    {buttonText}
                </span>
            }

        </>
    )
}

export default ReadMore;