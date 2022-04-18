import React, { useState, useEffect, Suspense, lazy } from 'react';
import { formatCompactNumber, timeConvert, purgeString } from '../../utils/formatters';
import { clearComments } from '../comments/commentsSlice';
import dashjs from 'dashjs';
import Loader from '../loader/Loader';
import comments from '../../icons/comments.svg';
import arrowUp from '../../icons/arrowUp.svg';
import arrowDown from '../../icons/arrowDown.svg';
import Comments from '../comments/Comments';
import './Post.css';


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

    const [showComments, setShowComments] = useState(false);
    const { is_gallery, permalink } = props;

    useEffect(() => {
        if (isVideo) {
            dashjs.MediaPlayerFactory.createAll('video') 
        }
    }, [isVideo]);


    // Return correct element according to type of media in post (link/image/video)
    const mediaComponent = () => {
        switch (hint) {
            case "link":
                return <a className="post-link" href={url}>{domain}</a>;
        
            case "image":
                const isGif = props.preview.images[0].variants?.gif?.source;
                const imageSource = props.preview.images[0].source;
                const imageResolutions = props.preview.images[0].resolutions;
                if (!isGif) {
                    return <a target="_blank" rel="noreferrer" href={url}>
                            <img 
                            id="main-image" 
                            loading="lazy"
                            decoding="auto"
                            alt="" 
                            src={imageSource.url}
                            srcSet={imageResolutions.map(el => `${purgeString(el.url)} ${el.width}w`)}
                            sizes="(min-width: 960px) 40vw ,100vw" />
                        </a>
                }
                return <a target="_blank" rel="noreferrer" href={url}>
                        <img 
                        id="main-image" 
                        loading="lazy"
                        decoding="auto"
                        alt="" 
                        src={url} 
                        width={isGif.width}
                        height={isGif.height}
                        />
                    </a>
        
            case "hosted:video":
                const posterImg = purgeString(props.preview.images[0].source.url);
                const videoURL = purgeString(props.media.reddit_video.fallback_url);
                const dashURL = purgeString(props.media.reddit_video.dash_url);
                const hlsURL = purgeString(props.media.reddit_video.hls_url);
                return (
                    <video 
                        autoPlay={false}
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

                case "rich:video":
                    const embedString = decodeURIComponent(props.media.oembed.html);
                    const embedHtml = purgeString(embedString);
                    return <div dangerouslySetInnerHTML={{__html: embedHtml}}></div>
            default:
                break;
        }
    }

    const handleCommentsClick = () => {
        setShowComments(showComments => !showComments);
    }

    return (
        <div className="post">
            <div className="post-header">
                {/* <img src="https://i.imgur.com/aEcJUFK.png" alt="" /> */}
                <p className="post-info">
                Posted by <b>{author}</b>, {timeConvert(postTime)}
                </p>
            </div>
            <h3>{purgeString(content)}</h3>
            {!isSelf &&
                <div className="media-container">
                    {is_gallery && 
                    <a target='_blank' 
                       rel="noreferrer" 
                       href={url}>
                       View Gallery
                    </a>}
                    {mediaComponent()}
                </div>
            }
            <div className="post-footer">
                <div className="post-comments" onClick={handleCommentsClick}>
                    <img src={comments} alt="" />
                    <p>{formatCompactNumber(commentsAmount)} Comments</p>
                </div>
                <div className="post-votes">
                    <img src={arrowUp} alt="" />
                    <p>{formatCompactNumber(votes)} Upvotes</p>
                    {/* <img src={arrowDown} alt="" /> */}
                </div>
            </div>
                {
                    showComments &&
                    <Comments showComments={showComments} 
                    permalink={permalink} 
                    handleCommentsClick={handleCommentsClick}/>
                }
        </div>
    )
}

export default Post;