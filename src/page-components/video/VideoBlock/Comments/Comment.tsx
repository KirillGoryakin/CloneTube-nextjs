import { Comment as CommentType } from '@/appTypes';
import Image from 'next/image';
import Link from 'next/link';
import style from './style.module.scss';

type Props = {
  comment: CommentType;
};

const Comment: React.FC<Props> = ({ comment }) => {
  return (
    <div className={style.comment}>
      <div className={style.avatar}>
        <Link href={`/channel/${comment.authorChannelId}`}>
          <Image
            src={comment.authorProfileImageUrl.slice(-1)[0].url}
            alt='Avatar'
            width={80}
            height={80}
          />
        </Link>
      </div>

      <div className={style.meta}>
        <div>
          <Link
            className={style.name}
            href={`/channel/${comment.authorChannelId}`}
          >
            <span>{comment.authorDisplayName}</span>
          </Link>
          <span className={style.time}>
            {comment.publishedTimeText}
          </span>
        </div>

        <div className={style.text}>{comment.textDisplay}</div>

        <div className={style.likes}>{`${comment.likesCount} likes`}</div>
      </div>
    </div>
  );
};

export { Comment };