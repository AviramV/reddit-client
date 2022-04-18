import { Suspense, useEffect, useRef, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, selectComments, selectLoading, clearComments } from './commentsSlice';
import Loader from '../loader/Loader';
import './Comments.css'
import Comment from '../comment/Comment';
// const Comment = lazy(() => import('../comment/Comment'));


function Comments({ showComments, permalink, handleCommentsClick }) {
    const comments = useSelector(selectComments).filter(el => el.kind === 't1');
    const loading = useSelector(selectLoading);
    const dispatch = useDispatch();
    const modal = useRef(null);

    useEffect(() => {
        modal.current.showModal();
        dispatch(fetchComments(permalink));
    },[showComments]);

    const handleClick = () => {
        modal.current.close();
        handleCommentsClick();
        dispatch(clearComments());
    }

  return (
        <dialog ref={modal} >
            <button onClick={handleClick}>X</button>
            {
                comments.map((comment, index) => {
                    const { body, ups, author, created } = comment.data;
                    const replies = comment.data.replies?.data?.children || "No";
                    return <Comment
                            key={index}
                            body={body}
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