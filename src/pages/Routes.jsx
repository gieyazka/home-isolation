
import React, { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'contexts/theme';
import Header from 'components/header';
import Footer from 'components/footer';
import NotificationList from 'components/notificationList';
import store from 'stores';
import { Provider } from 'react-redux';
import { statusBarStyle } from 'config';
import Login from './login'
import { AppProps } from 'next/app';
import { Provider as NextAuth } from "next-auth/client"
import { signIn, signOut, useSession } from "next-auth/client";
import { getSession } from "next-auth/client";
import { useRouter } from 'next/router'

const Routes =({Component,pageProps}) => {
  const [session, loading] = useSession();
  const router = useRouter()
  // console.log(router.pathname);
if(loading){
return <>
Loading Page
</>
}
else if(!loading && !session){
    return(
        <Login />
    )
}else{
    return (
        <ThemeProvider> 
          <NotificationList />
        
           <Header />
         <Component  { ...pageProps } />
         {/* <Footer /> */}
        </ThemeProvider>
    )
}
}

export default Routes;