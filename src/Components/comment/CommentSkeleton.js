import './CommentSkeleton.css'

function CommentSkeleton({amount}) {
    return (
        skeletonFactory(amount)
    )
}

export default CommentSkeleton;



const COMMENT = 
        <div className="skeleton__comment">
            <div className="skeleton__comment-header"></div>
            <div className="skeleton__comment-content">
                <div></div>
                <div></div>
            </div>
            <div className="skeleton__comment-footer">
                <div className="skeleton__comment-replies"></div>
                <div className="skeleton__comment-votes"></div>
            </div>
        </div>

function skeletonFactory(amount) {
    const array = new Array(amount).fill(COMMENT);
    const output = array.map((el, index) => <li key={index}>{el}</li>)
    return output
}