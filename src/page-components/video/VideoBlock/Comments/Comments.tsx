import { Comment as CommentType } from '@/appTypes';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getOptions } from '@/utils';
import { Comment } from './Comment';
import { CommentsTablet } from './CommentsTablet';
import style from './style.module.scss';
import { useWindowSize } from '@/hooks/windowSize';

type Props = {
  videoId: string | undefined;
};

const Comments: React.FC<Props> = ({ videoId }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [count, setCount] = useState<string>('');

  const { width } = useWindowSize();
  const tablet = width ? width <= 900 : false;

  useEffect(() => {
    const fetchComments = async () => {
      if (!videoId) return;

      const { data } = await axios(getOptions('comments', { id: videoId }));
      setComments(data.data);
      setCount(data.commentsCount);
    };

    fetchComments();
  }, [videoId]);

  if (tablet)
    return <CommentsTablet comments={comments} count={count} />;
  
  return (
    <div className={style.comments}>
      <div className={style.count}>{`${count} comments`}</div>

      <div className={style.commentList}>
        {comments.map(comment => (
          <Comment key={comment.commentId} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export { Comments };