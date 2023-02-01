import { ChannelInfo } from '@/appTypes';
import style from '@/styles/pages/channel.module.scss';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Props = {
  channel: ChannelInfo | undefined;
};

const TopBar: React.FC<Props> = ({ channel }) => {

  if (!channel) return null;
  
  return (
    <motion.div
      className={style.topbar}
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className={style.avatar}>
        <Image
          src={channel?.meta.thumbnail.slice(-1)[0].url}
          alt='Avatar'
          width={80}
          height={80}
        />
      </div>

      <div className={style.meta}>
        <div className={style.title}>
          {channel?.meta.title}
        </div>
        <div className={style.subscribers}>
          {`${channel?.meta.subscriberCount} subscribers`}
        </div>
      </div>
    </motion.div>
  );
};

export { TopBar };