import { Comment as CommentType } from '@/appTypes';
import { useEffect, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';
import style from './style.module.scss';
import { HiChevronUpDown } from 'react-icons/hi2';
import { RxCross1 } from 'react-icons/rx';
import { Comment } from './Comment';

type Props = {
  comments: CommentType[];
  count: string;
};

const CommentsTablet: React.FC<Props> = ({ comments, count }) => {
  const [open, setOpen] = useState(false);

  const variants = {
    show: { y: 0 },
    hide: { y: 1000 },
  };

  const overlayAnimationProps: MotionProps = {
    variants,
    initial: { y: 1000 },
    animate: open? 'show': 'hide',
    transition: { type: 'tween' },
    drag: 'y',
    dragMomentum: false,
    dragConstraints: {
      top: 0,
      bottom: 0,
    },
    dragElastic: { top: 0, bottom: 0.8 },
    dragDirectionLock: true,
    onDragEnd(_, info) { if (info.offset.y > 200) setOpen(false); },
  };

  useEffect(() => {
    if (open)
      document.body.classList.add('noscroll');
    else
      document.body.classList.remove('noscroll');
  }, [open]);

  return (
    <div className={style.comments}>
      <div
        className={style.commentsButton}
        onClick={() => setOpen(true)}
      >
        <div className={style.count}>{`Comments • ${count}`}</div>
        <HiChevronUpDown className={style.commentIcon} />
      </div>

      <motion.div
        className={style.overlay}
        {...overlayAnimationProps}
      >
        <div className={style.topBar}>
          <div className={style.title}>Comments</div>
          <RxCross1
            className={style.closeButton}
            onClick={() => setOpen(false)}
          />
        </div>

        <div className={style.commentList}>
          {comments.map(comment => (
            <Comment key={comment.commentId} comment={comment} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export { CommentsTablet };