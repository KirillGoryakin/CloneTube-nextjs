import style from './style.module.scss';
import logo from 'public/logo.png';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.top}>
        <Image className={style.logo} src={logo} alt='Logo' />
        <span className={style.author}>by
          <a
            href='https://github.com/KirillGoryakin'
            rel='noreferrer'
            target='_blank'
          >
            Kirill Goryakin
          </a>
        </span>
      </div>
      <div className={style.bottom}>
        <a
          className={style.repository}
          href='https://github.com/KirillGoryakin/CloneTube-nextjs'
          rel='noreferrer'
          target='_blank'
        >
          GitHub repository
        </a>
      </div>
    </div>
  );
};

export { Footer };