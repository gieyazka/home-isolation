import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { injectClassNames } from 'utils/css';
import styles from './Items.module.scss';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { signOut } from "next-auth/client"
const {
  items,
  active
} = styles;

const links = [
  { name: 'Home', url: '/', alias: []  ,icon : <HomeIcon />},
  { name: 'Pages', url: '/oxygen', alias: ['/[page]'] ,icon : <NotificationsIcon />},
  { name: 'Logout', url: '/logout', alias: [],icon : <ExitToAppIcon />  }
];

export default function Items() {
  const { pathname } = useRouter();
  console.log(window.location);
  return (
    <ul className={ items }>
      { links.map(({ name, url, alias,icon }) => (
        <li
          key={ name }
          className={
            injectClassNames([
              active,
              pathname === url
                        || alias.includes(pathname)
            ])
          }
        >{name === 'Logout' ?   <ExitToAppIcon onClick={() => signOut()}>Sign out</ExitToAppIcon> :
          <Link  href={ url }>{ icon }</Link>}
        </li>
      )) }
    </ul>
  );
}
