import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import './ReadMore.css'

function ReadMore({ children }) {
    const [isFullText, setFullText] = useState(false);
    const textLength = children.length;
    const buttonText = isFullText ? '<< Show less' : 'Read more >>';
  
    const handleClick = () => {
      if (!children || textLength <= 200) return;
      setFullText(!isFullText)
    }

    return (
      <>
        <ReactMarkdown linkTarget={"_blank"} skipHtml={true} remarkPlugins={[remarkGfm]}>
          {!isFullText ? children.substring(0, 200) : children}
        </ReactMarkdown>
        {
          textLength > 200 &&
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