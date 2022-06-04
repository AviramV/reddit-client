import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, selectComments, selectLoading, selectError, clearComments } from './commentsSlice';
import './Comments.css'
import Comment from '../comment/Comment';
import CommentSkeleton from '../comment/CommentSkeleton';
import ErrorMessage from '../errorMessage/errorMessage';
// const Comment = lazy(() => import('../comment/Comment'));


function Comments({ showComments, permalink, handleCommentsClick }) {
    const comments = useSelector(selectComments).filter(el => el.kind === 't1');
    const loading = useSelector(selectLoading);
    const hasError = useSelector(selectError);
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

  if (hasError) return <ErrorMessage hasError={hasError} type="comments"/>

  return (
        <dialog ref={modal} onClose={handleCommentsClick} >
            <button onClick={handleClick}>X</button>
            {loading && <CommentSkeleton amount={5}/>}
            {   
                comments.map((comment) => {
                    const { body, score, author, created, id } = comment.data;
                    const replies = comment.data.replies?.data?.children;
                    return <Comment
                            key={id}
                            body={body}
                            score={score}
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