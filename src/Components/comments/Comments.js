import { Suspense, useEffect, useRef, lazy, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, selectComments, selectLoading, clearComments } from './commentsSlice';
import Loader from '../loader/Loader';
import './Comments.css'
import Comment from '../comment/Comment';
import CommentSkeleton from '../comment/CommentSkeleton';
// const Comment = lazy(() => import('../comment/Comment'));


function Comments({ showComments, permalink, handleCommentsClick }) {
    const comments = useSelector(selectComments).filter(el => el.kind === 't1');
    const loading = useSelector(selectLoading);
    const dispatch = useDispatch();
    const modal = useRef(null);
    
    useEffect(() => {
        if (typeof modal.current.showModal !== 'function') {
            modal.current.hidden = true;
            return alert(`Your browser doesn't support the dialog element, please update to a newer version`);
        }
        modal.current.showModal();
        dispatch(fetchComments(permalink));
    },[showComments]);

    const handleClick = () => {
        // modal.current.close();
        handleCommentsClick();
        dispatch(clearComments());
    }

  return (
        <dialog ref={modal} onClose={handleCommentsClick}>
            <button onClick={handleClick}>X</button>
            {loading && <CommentSkeleton amount={5}/>}
            {   
                comments.map((comment) => {
                    const { body_html, ups, author, created, id } = comment.data;
                    const replies = comment.data.replies?.data?.children || "No";
                    return <Comment
                            key={id}
                            body={body_html}
                            ups={ups}
                            author={author}
                            created={created}
                            replies={replies}
                            />
 
                        })
                    }
        </dialog>
 ); 
}

export default Comments;