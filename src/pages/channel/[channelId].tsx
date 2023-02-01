import axios from 'axios';
import style from '@/styles/pages/channel.module.scss';
import { motion } from 'framer-motion';
import { ChannelInfo, ChannelVideoInfo } from '@/appTypes';
import { getOptions } from '@/utils';
import { TopBar } from '@/page-components/channel/TopBar';
import { ChannelVideos } from '@/page-components/channel/ChannelVideos';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';

type Props = {
  channel: ChannelInfo;
  channelId: string;
};

const ChannelPage: React.FC<Props> = ({ channel, channelId }) => {
  const [videos, setVideos] = useState<ChannelVideoInfo[]>(channel.data);
  const [token, setToken] = useState<string>(channel.continuation);
  
  const fetchMore = async () => {
    const { data } = await axios(
      getOptions('channel', {
        id: channelId,
        token,
      }));

    setVideos(videos.concat(data.data));
    setToken(data.continuation);
  };
  
  return (
    <div className={style.channel}>
      <motion.div
        className={style.banner}
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Image
          src={channel?.meta.image.banner.slice(-1)[0].url}
          alt='Banner'
          width={1200}
          height={200}
        />
      </motion.div>

      <TopBar channel={channel} />

      <InfiniteScroll
        dataLength={videos.length}
        next={fetchMore}
        hasMore={token.length > 0}
        loader={<></>}
        style={{ overflow: 'hidden' }}
      >
        <ChannelVideos videos={videos} />
      </InfiniteScroll>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { channelId } = context.query;
  
  const { data } = await axios(
    getOptions('channel', { id: channelId }));

  return { props: {
    channel: data,
    channelId,
  } };
};

export default ChannelPage;