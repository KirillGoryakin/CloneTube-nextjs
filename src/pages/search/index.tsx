import { SearchInfo } from '@/appTypes';
import style from '@/styles/pages/search.module.scss';
import axios from 'axios';
import { motion, Variants } from 'framer-motion';
import { formatNumber, getOptions } from '@/utils';
import { VideoCard } from '@/components/VideoCard';
import { GetServerSideProps } from 'next';

type Props = {
  search: SearchInfo;
};

const SearchPage: React.FC<Props> = ({ search }) => {

  const searchVideosVariants: Variants = {
    'initial': {},
    'animate': {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className={style.search}>
      <div className={style.results}>
        {search?.estimatedResults
          ? `${formatNumber(Number(search.estimatedResults))} results`
          : '0 results'}
      </div>

      {search?.data &&
        <motion.div
          className={style.videos}
          variants={searchVideosVariants}
          initial='initial'
          animate='animate'
        >
          {search?.data.filter(({ type }) => type === 'video').map(video => (
            <VideoCard key={video.videoId} video={video} variant='search' />
          ))}
        </motion.div>
      }
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { s } = query;
  
  const { data } = await axios(
    getOptions('search', {
      query: s,
      type: 'video',
    }));

  return { props: { search: data } };
};

export default SearchPage;