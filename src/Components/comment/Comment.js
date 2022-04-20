import { formatCompactNumber, timeConvert, purgeString } from '../../utils/formatters';
import comments from '../../icons/comments.svg';
import arrowUp from '../../icons/arrowUp.svg';
import './Comment.css'


function Comment({ body, ups, author, created, replies }) {
    return (
        <div className="comment">
            <div className="comment-header">
                <p className="comment-info"><b>{author}</b>, {timeConvert(created)}</p>
            </div>
            <div className="comment-content" dangerouslySetInnerHTML={{__html: purgeString(body)}}></div>
            <div className="comment-footer">
                <div className="comment-replies" >
                    <img src={comments} alt="" />
                    <p>{formatCompactNumber(replies.length) ?? 'No'} Replies</p>
                </div>
                <div className="comment-votes">
                    <img src={arrowUp} alt="" />
                    <p>{formatCompactNumber(ups)} Upvotes</p>
                </div>
            </div>
        </div>
    );
}

export default Comment;