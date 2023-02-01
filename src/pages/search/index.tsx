import { SearchInfo, SearchVideoInfo } from '@/appTypes';
import style from '@/styles/pages/search.module.scss';
import axios from 'axios';
import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { formatNumber, getOptions } from '@/utils';
import { VideoCard } from '@/components/VideoCard';
import { GetServerSideProps } from 'next';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  search: SearchInfo;
  s: string;
};

const SearchPage: React.FC<Props> = ({ search, s }) => {
  const [videos, setVideos] = useState<SearchVideoInfo[]>(search.data);
  const [token, setToken] = useState<string>(search.continuation);
  
  const searchVideosVariants: Variants = {
    'initial': {},
    'animate': {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const fetchMore = async () => {
    const { data } = await axios(
      getOptions('search', {
        type: 'video',
        query: s,
        token,
      }));

    setVideos(videos.concat(data.data));
    setToken(data.continuation);
  };

  return (
    <div className={style.search}>
      <div className={style.results}>
        {search?.estimatedResults
          ? `${formatNumber(Number(search.estimatedResults))} results`
          : '0 results'}
      </div>

      {search?.data &&
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchMore}
          hasMore={token.length > 0}
          loader={<></>}
          style={{ overflow: 'hidden' }}
        >
          <motion.div
            className={style.videos}
            variants={searchVideosVariants}
            initial='initial'
            animate='animate'
          >
            {videos.filter(({ type }) => type === 'video').map((video, i) => (
              <VideoCard
                key={video.videoId + i}
                video={video}
                variant='search'
              />
            ))}
          </motion.div>
        </InfiniteScroll>
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

  return { props: { search: data, s } };
};

export default SearchPage;