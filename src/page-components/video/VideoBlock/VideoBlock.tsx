import { ChannelInfo, VideoInfo } from '@/appTypes';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import YouTube from 'react-youtube';
import { Comments } from './Comments';
import style from './style.module.scss';

type Props = {
  videoId: string;
  videoInfo: VideoInfo;
  channel: ChannelInfo;
};

const VideoBlock: React.FC<Props> = (props) => {
  const {
    videoId,
    videoInfo,
    channel,
  } = props;
  
  return (
    <motion.div
      className={style.videoBlock}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <YouTube
        className={style.video}
        videoId={videoId}
      />

      <div className={style.videoMeta}>
        <div className={style.videoTitle}>{videoInfo?.title}</div>

        <Link
          className={style.channel}
          href={`/channel/${videoInfo?.channelId}`}
        >
          <Image
            className={style.avatar}
            src={channel?.meta.thumbnail.slice(-1)[0].url}
            alt='Avatar'
            width={80}
            height={80}
          />

          <div className={style.channelMeta}>
            <div className={style.title}>
              {channel?.meta.title}
            </div>
            <div className={style.subscribers}>
              {`${channel?.meta.subscriberCount} subscribers`}
            </div>
          </div>
        </Link>

        <div className={style.description}>
          {videoInfo?.description}
        </div>
      </div>

      <Comments videoId={videoId} />
    </motion.div>
  );
};

export { VideoBlock };