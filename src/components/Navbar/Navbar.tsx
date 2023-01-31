import { motion } from 'framer-motion';
import style from './style.module.scss';
import logo from 'public/logo.png';
import { SearchBar } from './SearchBar';
import { createContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWindowSize } from '@/hooks/windowSize';

type SearchContext = [boolean, (value: boolean) => void];
export const searchContext = 
  createContext<SearchContext>([false, () => {}]);

const Navbar = () => {
  const { width } = useWindowSize();
  const mobile = width ? width <= 600 : false;
  
  const [search, setSearch] = useState(false);
  
  return (
    <motion.header
      className={style.header}
      initial={{ y: -300 }}
      animate={{ y: 0 }}
    >
      <nav>
        {mobile && search ? null : (
          <Link href='/' className={style.logo}>
            <Image src={logo} alt='CloneTube' />
          </Link>
        )}

        <searchContext.Provider value={[search, setSearch]}>
          <SearchBar />
        </searchContext.Provider>
      </nav>
    </motion.header>
  );
};

export { Navbar };