import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoading, selectPosts, selectError, fetchPosts } from './postsSlice';
import { setCategory } from '../filter/filterSlice';
import { useLocation, useParams, useSearchParams, useNavigate } from 'react-router-dom';

import Post from '../post/Post';
import Loader from '../loader/Loader';
import ErrorMessage from '../errorMessage/errorMessage';

import './Posts.css'

function Posts() {
    const isLoading = useSelector(selectLoading);
    const posts = useSelector(selectPosts);
    const { hasError, errorCode } = useSelector(selectError);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams('');
    const location = useLocation();
    const { pathname } = location;
    const { categoryName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (pathname.includes('/category')) {
            dispatch(fetchPosts({ fetchBy: 'filter', term: categoryName }));
            dispatch(setCategory(categoryName))
            return;
        }
        if (pathname.includes('search/')) {
            console.dir(location)
            console.log('query:', searchParams.get('q'))
            const getTerm = query => searchParams.get(query);
            dispatch(fetchPosts({ fetchBy: 'search', term: getTerm('q') }));
            dispatch(setCategory(''));
            return;
        }
        if (pathname === '/') {
            dispatch(fetchPosts());
            dispatch(setCategory(''));
            return;
        }
        if (pathname.includes('r/')) {
            navigate('/category/' + categoryName, { replace: true });
        }

    }, [location, categoryName, dispatch, navigate, pathname, searchParams]);


    return isLoading ? <Loader /> :
        hasError ? <ErrorMessage hasError={hasError} errorCode={errorCode} type="posts" /> :
            (posts.length < 1) ? <ErrorMessage /> :
                (
                    <div className="posts">
                        {posts.map((post) => <Post props={post.data}
                            key={post.data.id}
                            content={post.data.title}
                            author={post.data.author}
                            postTime={post.data.created_utc}
                            url={post.data.url}
                            commentsAmount={post.data.num_comments}
                            votes={post.data.ups - post.data.downs}
                            isVideo={post.data.is_video}
                            isSelf={post.data.is_self}
                            domain={post.data.domain}
                            hint={post.data.post_hint}
                        />)}
                    </div>
                )
}

export default Posts;