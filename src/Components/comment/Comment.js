import { useState } from 'react';
import { formatCompactNumber, timeConvert, purgeString } from '../../utils/formatters';

import { commentsIcon, arrowUp, arrowDown } from '../../icons/postIcons';
import './Comment.css'

function Comment({ body, score, author, created, replies }) {
    const [showReplies, setShowReplies] = useState(false);

    // Replies are received in an array, no replies comes in as an empty string.
    // Check if a comment has replies
    const hasReplies = Array.isArray(replies);
    
    // Filter out any element that's not a reply
    const filteredReplies = () => {
        if (!hasReplies) return;
        return replies.filter(reply => reply.kind === 't1');
    }

    return (
        <div className="comment">
            <div className="comment-header">
                <p className="comment-info"><b>{author}</b>, {timeConvert(created)}</p>
            </div>
            <div className="comment-content" dangerouslySetInnerHTML={{__html: purgeString(body)}}></div>
            <div className="comment-footer">
                { hasReplies && filteredReplies().length > 0 &&
                    <div className="comment-replies" onClick={() => setShowReplies(!showReplies)}>
                        {commentsIcon}
                        <p>{formatCompactNumber(filteredReplies().length)} {filteredReplies().length > 1 ? "Replies" : "Reply"}</p>
                    </div>
                }
                <div className="comment-votes">
                    {arrowUp}
                    <p>{formatCompactNumber(score)}</p>
                    {arrowDown}
                </div>
            </div>
                {
                    showReplies && 
                    <div className="replies">
                        {
                    filteredReplies().map(reply => {
                        const { id, body_html, score, author, created } = reply.data;
                        return <Comment key={id} body={body_html} score={score} author={author} created={created} />
                    }) 
                        }
                    </div>
                }
        </div>
    );
}

export default Comment;