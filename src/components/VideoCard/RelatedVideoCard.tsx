import { RelatedVideoInfo } from '@/appTypes';
import { formatNumber } from '@/utils';
import style from './related.module.scss';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  video: RelatedVideoInfo;
};

const RelatedVideoCard: React.FC<Props> = ({ video }) => {
  const {
    videoId,
    channelId,
    thumbnail,
    lengthText,
    title,
    channelTitle,
    viewCount,
    publishedTimeText,
  } = video;

  const relatedVideoVariants: Variants = {
    'initial': { x: 200 },
    'animate': { x: 0 },
  };

  return (
    <motion.div
      className={style.videoCard}
      variants={relatedVideoVariants}
    >
      <Link
        className={style.thumbnail}
        href={`/video/${videoId}`}
      >
        <Image
          src={thumbnail.slice(-1)[0].url}
          alt='Thumbnail'
        />

        <div className={style.videoLength}>{lengthText}</div>
      </Link>

      <div className={style.videoMeta}>
        <Link
          className={style.title}
          href={`/video/${videoId}`}
        >
          {title}
        </Link>
        <Link
          className={style.channelTitle}
          href={`/channel/${channelId}`}
        >
          {channelTitle}
        </Link>

        <Link
          className={style.viewsAndDate}
          href={`/video/${videoId}`}
        >
          {`${formatNumber(Number(viewCount))} views • ${publishedTimeText}`}
        </Link>
      </div>
    </motion.div>
  );
};

export { RelatedVideoCard };