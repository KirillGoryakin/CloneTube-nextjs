import axios from 'axios';
import style from '@/styles/pages/video.module.scss';
import { motion, Variants } from 'framer-motion';
import { ChannelInfo, RelatedVideoInfo, VideoInfo } from '@/appTypes';
import { getOptions } from '@/utils';
import { VideoBlock } from '@/page-components/video/VideoBlock';
import { VideoCard } from '@/components/VideoCard';
import { GetServerSideProps } from 'next';

type Props = {
  videoId: string;
  videoInfo: VideoInfo;
  relatedVideos: RelatedVideoInfo[];
  channel: ChannelInfo;
};

const VideoPage: React.FC<Props> = (props) => {
  const {
    videoId,
    videoInfo,
    relatedVideos,
    channel,
  } = props;

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

      {relatedVideos && (
        <motion.div
          className={style.relatedVideos}
          variants={relatedVideosVariants}
          initial='initial'
          animate='animate'
        >
          {relatedVideos?.map(video => (
            <VideoCard key={video.videoId} video={video} variant='related' />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { videoId } = query;
  
  // Fetch videoInfo
  const { data: videoInfo } = await axios.request(
    getOptions('video', { id: videoId }));

  // Fetch relatedVideos
  const { data: relatedVideos } = await axios.request(
    getOptions('related', { id: videoId }));

  // Fetch channel
  const { data: channel } = await axios.request(
    getOptions('channel', { id: videoInfo.channelId }));

  return {
    props: {
      videoId,
      videoInfo,
      relatedVideos: relatedVideos.data,
      channel,
    },
  };
};

export default VideoPage;