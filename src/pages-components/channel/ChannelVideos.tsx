import { ChannelVideoInfo } from '@/appTypes';
import { VideoCard } from '@/components/VideoCard';
import style from '@/styles/channel.module.scss';
import { motion, Variants } from 'framer-motion';

type Props = {
  videos: ChannelVideoInfo[] | undefined;
};

const ChannelVideos: React.FC<Props> = ({ videos }) => {
  const channelVideosVariants: Variants = {
    'initial': {},
    'animate': {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  if (!videos) return null;
  
  return (
    <motion.div
      className={style.videos}
      variants={channelVideosVariants}
      initial='initial'
      animate='animate'
    >
      {videos?.map(video => (
        <VideoCard key={video.videoId} video={video} variant='channel' />
      ))}
    </motion.div>
  );
};

export { ChannelVideos };