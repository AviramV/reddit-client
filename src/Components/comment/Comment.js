import { useState } from 'react';
import { formatCompactNumber, timeConvert, purgeString } from '../../utils/formatters';
import comments from '../../icons/comments.svg';
import arrowUp from '../../icons/arrowUp.svg';
import arrowDown from '../../icons/arrowDown.svg';
import './Comment.css'


function Comment({ body, score, author, created, replies }) {
    const [showReplies, setShowReplies] = useState(false);
    const haveReplies = Array.isArray(replies);
    return (
        <div className="comment">
            <div className="comment-header">
                <p className="comment-info"><b>{author}</b>, {timeConvert(created)}</p>
            </div>
            <div className="comment-content" dangerouslySetInnerHTML={{__html: purgeString(body)}}></div>
            <div className="comment-footer">
                { haveReplies && 
                    <div className="comment-replies" onClick={() => setShowReplies(!showReplies)}>
                        <img src={comments} alt="" />
                        <p>{formatCompactNumber(replies.length)} {replies.length > 1 ? "Replies" : "Reply"}</p>
                    </div>
                }
                <div className="comment-votes">
                    <img src={arrowUp} alt="" />
                    <p>{formatCompactNumber(score)}</p>
                    <img src={arrowDown} alt="" />
                </div>
            </div>
                {showReplies && <div className="replies">reply</div>}
        </div>
    );
}

export default Comment;