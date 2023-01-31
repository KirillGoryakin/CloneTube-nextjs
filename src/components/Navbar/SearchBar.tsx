import style from './style.module.scss';
import { useContext, createRef } from 'react';
import { TfiSearch } from 'react-icons/tfi';
import { searchContext } from './Navbar';
import ClickAwayListener from 'react-click-away-listener';
import { useRouter } from 'next/router';
import { useWindowSize } from '@/hooks/windowSize';

type SendFormEvent = {
  target: {
    s: { value: string; };
  };
};

const SearchBar = () => {
  const router = useRouter();
  
  const { width } = useWindowSize();
  const mobile = width ? width <= 600 : false;
  
  const [search, setSearch] = useContext(searchContext);
  const formRef = createRef<HTMLFormElement>();
  const inputRef = createRef<HTMLInputElement>();

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    const
      { target } = e as typeof e & SendFormEvent,
      s = target.s.value.trim();

    if (!s) return;
      
    router.push(`/search?s=${s}`);
  };

  const handleMobileButtonClick = () => {
    setSearch(true);
    formRef.current?.classList.add(style.show);
    inputRef.current?.focus();
  };

  const handleClickAway = () => {
    if (!mobile) return;

    formRef.current?.classList.remove(style.show);
    setSearch(false);
  };
  
  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <form
          className={style.searchBar}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <label className={style.inputWrap}>
            <input
              name='s'
              placeholder='Search...'
              defaultValue={router.query.s || ''}
              ref={inputRef}
            />
          </label>
          <button type='submit' className={style.submit}><TfiSearch /></button>
        </form>
      </ClickAwayListener>

      {mobile && !search && (
        <button
          className={style.mobileSearchButton}
          onClick={handleMobileButtonClick}
        >
          <TfiSearch />
        </button>
      )}
    </>
  );
};

export { SearchBar };