import { motion, Variants } from 'framer-motion';
import axios from 'axios';
import { TrendingVideoInfo } from '@/appTypes';
import style from '@/styles/home.module.scss';
import { VideoCard } from '@/components/VideoCard';
import { getOptions } from '@/utils';

type Props = {
  videos: TrendingVideoInfo[];
};

const HomePage: React.FC<Props> = ({ videos }) => {
  const videosVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  if (videos.length === 0) return null;

  return (
    <motion.div
      className={style.videoGrid}
      variants={videosVariants}
      initial='initial'
      animate='animate'
    >
      {videos.map(video => (
        <VideoCard key={video.videoId} video={video} variant='trending' />
      ))}
    </motion.div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios(
    getOptions('trending', { geo: 'US' }));

  return { props: { videos: data.data } };
};

export default HomePage;