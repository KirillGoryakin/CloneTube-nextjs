import axios from 'axios';
import style from '@/styles/pages/video.module.scss';
import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  ChannelInfo,
  RelatedVideoInfo,
  VideoInfo,
  RelatedInfo,
} from '@/appTypes';
import { getOptions } from '@/utils';
import { VideoBlock } from '@/page-components/video/VideoBlock';
import { VideoCard } from '@/components/VideoCard';
import { GetServerSideProps } from 'next';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  videoId: string;
  videoInfo: VideoInfo;
  relatedInfo: RelatedInfo;
  channel: ChannelInfo;
};

const VideoPage: React.FC<Props> = (props) => {
  const {
    videoId,
    videoInfo,
    relatedInfo,
    channel,
  } = props;

  const [relatedVideos, setRelatedVideos] =
    useState<RelatedVideoInfo[]>(relatedInfo.data);
  const [token, setToken] = useState<string>(relatedInfo.continuation);

  const fetchMore = async () => {
    const { data } = await axios(
      getOptions('related', {
        id: videoId,
        token,
      }));

    setRelatedVideos(relatedVideos.concat(data.data));
    setToken(data.continuation);
  };

  const relatedVideosVariants: Variants = {
    'initial': {},
    'animate': {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className={style.pageWrap}>
      <VideoBlock
        videoId={videoId}
        videoInfo={videoInfo}
        channel={channel}
      />

      {relatedInfo.data && (
        <InfiniteScroll
          dataLength={relatedVideos.length}
          next={fetchMore}
          hasMore={token.length > 0}
          loader={<></>}
          style={{ overflow: 'hidden' }}
        >
          <motion.div
            className={style.relatedVideos}
            variants={relatedVideosVariants}
            initial='initial'
            animate='animate'
          >
            {relatedVideos.map(video => (
              <VideoCard key={video.videoId} video={video} variant='related' />
            ))}
          </motion.div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { videoId } = query;
  
  // Fetch videoInfo
  const { data: videoInfo } = await axios.request(
    getOptions('video', { id: videoId }));

  // Fetch relatedInfo
  const { data: relatedInfo } = await axios.request(
    getOptions('related', { id: videoId }));

  // Fetch channel
  const { data: channel } = await axios.request(
    getOptions('channel', { id: videoInfo.channelId }));

  return {
    props: {
      videoId,
      videoInfo,
      relatedInfo,
      channel,
    },
  };
};

export default VideoPage;