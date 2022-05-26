import { useState } from 'react';
import { formatCompactNumber, timeConvert, purgeString } from '../../utils/formatters';
import comments from '../../icons/comments.svg';
import arrowUp from '../../icons/arrowUp.svg';
import arrowDown from '../../icons/arrowDown.svg';
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
                        <img src={comments} alt="" />
                        <p>{formatCompactNumber(filteredReplies().length)} {filteredReplies().length > 1 ? "Replies" : "Reply"}</p>
                    </div>
                }
                <div className="comment-votes">
                    <img src={arrowUp} alt="" />
                    <p>{formatCompactNumber(score)}</p>
                    <img src={arrowDown} alt="" />
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