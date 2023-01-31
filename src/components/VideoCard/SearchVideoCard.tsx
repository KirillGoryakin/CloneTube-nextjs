import { SearchVideoInfo } from '@/appTypes';
import { formatNumber } from '@/utils';
import style from './search.module.scss';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  video: SearchVideoInfo;
};

const SearchVideoCard: React.FC<Props> = ({ video }) => {
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
    description,
  } = video;

  const searchVideoVariants: Variants = {
    'initial': { opacity: 0, x: -200 },
    'animate': { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className={style.videoCard}
      variants={searchVideoVariants}
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
          className={style.viewsAndDate}
          href={`/video/${videoId}`}
        >
          {`${formatNumber(Number(viewCount))} views • ${publishedText}`}
        </Link>
        
        <div className={style.channel}>
          <Link
            className={style.channelAvatar}
            href={`/channel/${channelId}`}
          >
            <img src={channelThumbnail.slice(-1)[0].url} alt='Avatar' />
          </Link>
          <Link
            className={style.channelTitle}
            href={`/channel/${channelId}`}
          >
            {channelTitle}
          </Link>
        </div>

        <div className={style.description}>
          {description}
        </div>
      </div>
    </motion.div>
  );
};

export { SearchVideoCard };