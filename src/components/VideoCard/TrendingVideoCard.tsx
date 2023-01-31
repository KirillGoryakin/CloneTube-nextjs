import { motion, Variants } from 'framer-motion';
import { TrendingVideoInfo } from '@/appTypes';
import { formatNumber } from '@/utils';
import style from './trending.module.scss';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  video: TrendingVideoInfo;
};

const TrendingVideoCard: React.FC<Props> = ({ video }) => {
  const {
    videoId,
    channelId,
    thumbnail,
    lengthText,
    title,
    channelThumbnail,
    channelTitle,
    viewCount,
    publishedText,
  } = video;

  const videoVariants: Variants = {
    initial: { opacity: 0, y: -200 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={style.videoCard}
      variants={videoVariants}
    >
      <Link
        className={style.thumbnail}
        href={`/video/${videoId}`}
      >
        <Image
          src={thumbnail.slice(-1)[0].url}
          alt='Thumbnail'
          width={280}
          height={156}
        />

        <div className={style.videoLength}>{lengthText}</div>
      </Link>

      <div className={style.videoMeta}>
        <Link
          className={style.avatar}
          href={`/channel/${channelId}`}
        >
          <Image
            src={channelThumbnail.slice(-1)[0].url}
            alt='Avatar'
            width={280}
            height={156}
          />
        </Link>

        <div>
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
            {`${formatNumber(Number(viewCount))} views • ${publishedText}`}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export { TrendingVideoCard };