import './Post.css';
import comments from '../../icons/comments.svg';
import arrowUp from '../../icons/arrowUp.svg';
import arrowDown from '../../icons/arrowDown.svg';

function Post({
    content,
    author,
    postTime,
    url,
    commentsAmount,
    votes,
    isVideo,
    isSelf,
    domain,
    hint,
    video,
    props
}) {

    // Format from Epoch to actual date
    const timeConvert = (time) => {
        const date = new Date(time*1000).toLocaleString();
        return date;
    }
    // Remove interfering charachters from URL string in JSON object
    const decodeURI = (uri) => uri.replace(/amp;/g, '')

    // Return correct element according to type of media in post (link/image/video)
    const mediaComponent = () => {
        switch (hint) {
            case "link":
                return <a className="post-link" href={url}>{domain}</a>;
        
            case "image":
                const imageURL = decodeURI(props.preview.images[0].source.url);
                const imageResolutions = props.preview.images[0].resolutions;
                return <img 
                        id="main-image" 
                        loading="lazy"
                        width="800"
                        decoding="auto"
                        alt="" 
                        src={url} 
                        srcSet={imageResolutions.map(el => `${decodeURI(el.url)} ${el.width}w`)}
                        sizes="(min-width: 960px) 75vw ,100vw" />
        
            case "hosted:video":
                const posterImg = decodeURI(props.preview.images[0].source.url);
                const videoURL = decodeURI(props.media.reddit_video.fallback_url);
                const dashURL = decodeURI(props.media.reddit_video.dash_url);
                const hlsURL = decodeURI(props.media.reddit_video.hls_url);
                return (
                    <video 
                        autoPlay
                        muted
                        preload="auto"
                        controls
                        poster={posterImg}
                        >
                            <source src={dashURL} type="application/dash+xml"/>
                            <source src={hlsURL} type="application/vnd.apple.mpegURL"/>
                            <source src={videoURL} type="video/mp4"/>
                            Sorry, your browser doesn't support embedded videos.
                    </video>
                )
            default:
                break;
        }
    }

    return (
        <div className="post">
            <div className="post-header">
                {/* <img src="https://i.imgur.com/aEcJUFK.png" alt="" /> */}
                <p className="post-info">
                Posted by <b>{author}</b> on {timeConvert(postTime)}
                </p>
            </div>
            <h3>{content}</h3>
            {!isSelf &&
                <div className="media-container">
                    {mediaComponent()}
                </div>
            }
            <div className="post-footer">
                <div className="post-comments">
                    <img src={comments} alt="" />
                    <p>{commentsAmount} Comments</p>
                </div>
                <div className="post-votes">
                    <img src={arrowUp} alt="" />
                    <p>{votes}</p>
                    {/* <img src={arrowDown} alt="" /> */}
                </div>
            </div>
        </div>
    )
}

export default Post;