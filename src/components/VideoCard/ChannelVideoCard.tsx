import { ChannelVideoInfo } from '@/appTypes';
import { formatNumber } from '@/utils';
import style from './channel.module.scss';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  video: ChannelVideoInfo;
};

const ChannelVideoCard: React.FC<Props> = ({ video }) => {
  const {
    videoId,
    thumbnail,
    lengthText,
    title,
    viewCount,
    publishedText,
  } = video;

  const channelVideoVariants: Variants = {
    'initial': { opacity: 0, y: -200 },
    'animate': { opacity: 1, y: 0 },
  };
  
  return (
    <motion.div
      className={style.videoCard}
      variants={channelVideoVariants}
    >
      <Link
        className={style.thumbnail}
        href={`/video/${videoId}`}
      >
        <Image
          src={thumbnail.slice(-1)[0].url}
          alt='Thumbnail'
          width={600}
          height={335}
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
      </div>
    </motion.div>
  );
};

export { ChannelVideoCard };