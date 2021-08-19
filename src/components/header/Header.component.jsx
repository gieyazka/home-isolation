import React, { memo, useEffect } from 'react';
import Icon from 'components/icon';
import Items from 'components/header/items';
import Logo from 'components/header/logo';
import ThemeToggler from 'components/header/themeToggler';
import styles from './Header.module.scss';
import { signIn, signOut, useSession } from "next-auth/client";
import { getSession } from "next-auth/client";
const OFFLINE = 'offline';

const {
  header,
  headerControls,
  offline,
  offlineIcon
} = styles;

const handleNetworkChange = ()=> {
  const { documentElement: { classList } } = document;
  if (!navigator.onLine) {
    classList.add(OFFLINE);

    return;
  }

  classList.remove(OFFLINE);
};

export default memo(
  function Header() {
  const [session, loading] = useSession();

    useEffect(() => {


     

      if (typeof window !== undefined) {
        handleNetworkChange();

        window.addEventListener('online', handleNetworkChange);
        window.addEventListener('offline', handleNetworkChange);

        return () => {
          window.removeEventListener('online', handleNetworkChange);
          window.removeEventListener('offline', handleNetworkChange);
        };
      }
    }, []);

    return (
      <>
        <div  className={ offline }>
          <Icon
            asset="Cloud-Slash"
            className={ offlineIcon }
          />
                    You are currently browsing in offline mode.
        </div>
        <header className={ header }>
          <nav>
            <div className={ headerControls }>
              <div style={{fontFamily : 'Bai jamjuree'}}  className='flex flex-col items-center mt-1'>
              <img className=' rounded-full h-11 w-11 '      src={session?.user?.image || ""} />
              <div className='mt-1 text-white'>{session?.user?.name}</div>
              </div>
              <div className='flex flex-row justify-end items-end '>
             {/* <Link href="/"> */}
      <img className='w-2/3' src="/assets/logo.png" />
      {/* </Link> */}
              {/* <ThemeToggler /> */}
            </div>
            </div>
            <Items />
          </nav>
        </header>
      </>
    );
  }
);
