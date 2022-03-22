import './Post.css';
import comments from '../../icons/comments.svg';
import arrowUp from '../../icons/arrowUp.svg';
import arrowDown from '../../icons/arrowDown.svg';

function Post() {
    return (
        <div className="post">
            <div className="post-header">
                <img src="https://i.imgur.com/aEcJUFK.png" alt="" />
                <p className="post-info">
                Posted by *Post Author* *Time of Post*
                </p>
            </div>
            <h3>Post Title</h3>
            {/* implement <picture> / <video> */}
            <div className="media-container">
                <img id="main-image" src='https://i.imgur.com/aEcJUFK.png' alt=""/>
            </div>
            <div className="post-footer">
                <div className="post-comments">
                    <img src={comments} alt="" />
                    <p>*number* Comments</p>
                </div>
                <div className="post-votes">
                    <img src={arrowUp} alt="" />
                    <p>*number*</p>
                    <img src={arrowDown} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Post;