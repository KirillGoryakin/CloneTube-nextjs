import axios from 'axios';
import style from './style.module.scss';
import { motion } from 'framer-motion';
import { ChannelInfo } from '@/appTypes';
import { getOptions } from '@/utils';
import { TopBar } from './components/TopBar';
import { ChannelVideos } from './components/ChannelVideos';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

type Props = {
  channel: ChannelInfo;
};

const ChannelPage: React.FC<Props> = ({ channel }) => {
  return (
    <div className={style.channel}>
      <motion.div
        className={style.banner}
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Image
          src={channel?.meta.image.banner.slice(-1)[0].url}
          alt='Banner'
          width={1200}
          height={200}
        />
      </motion.div>

      <TopBar channel={channel} />

      <ChannelVideos videos={channel?.data} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { channelId } = context.query;
  
  const { data } = await axios(
    getOptions('channel', { id: channelId }));

  return { props: { channel: data } };
};

export default ChannelPage;