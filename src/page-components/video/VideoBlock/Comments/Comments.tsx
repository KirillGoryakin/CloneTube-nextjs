import { Comment as CommentType } from '@/appTypes';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getOptions } from '@/utils';
import { Comment } from './Comment';
import { CommentsTablet } from './CommentsTablet';
import style from './style.module.scss';
import { useWindowSize } from '@/hooks/windowSize';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  videoId: string | undefined;
};

const Comments: React.FC<Props> = ({ videoId }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [token, setToken] = useState<string>('');
  const [count, setCount] = useState<string>('');

  const { width } = useWindowSize();
  const tablet = width ? width <= 900 : false;

  const fetchComments = async () => {
    if (!videoId) return;

    const params = token
      ? { id: videoId, token }
      : { id: videoId };

    const { data } = await axios(getOptions('comments', params));
    
    setComments(comments.concat(data.data));
    setCount(data.commentsCount);
    setToken(data.continuation);
  };
  
  useEffect(() => {
    fetchComments();
  }, [videoId]);

  if (tablet)
    return <CommentsTablet comments={comments} count={count} />;
  
  return (
    <div className={style.comments}>
      <div className={style.count}>{`${count} comments`}</div>

      <InfiniteScroll
        dataLength={comments.length}
        next={fetchComments}
        hasMore={token.length > 0}
        loader={<></>}
        style={{ overflow: 'hidden' }}
      >
        <div className={style.commentList}>
          {comments.map(comment => (
            <Comment key={comment.commentId} comment={comment} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export { Comments };