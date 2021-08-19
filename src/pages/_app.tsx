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
import 'styles/main.scss';
import { Provider as NextAuth } from "next-auth/client"
import { signIn, signOut, useSession } from "next-auth/client";
import { getSession } from "next-auth/client";
import Routes from "./Routes";

// import 'tailwindcss/tailwind.css'
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [session, loading] = useSession();
  function getCookie(name : any) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
  
  useEffect(() => {
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(
        process.env.serviceWorkerUrl as string,
        { scope: '/' }
      );
    }
  }, []);



  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content={ statusBarStyle } />
        <link rel="apple-touch-startup-image" sizes="512x512" href="/covid_home_isolation-color.png" />
        <link rel="apple-touch-startup-image" sizes="256x256" href="/covid_home_isolation-color.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/covid_home_isolation-color.png" />
        <link rel="apple-touch-icon" sizes="256x256" href="/covid_home_isolation-color.png" />
        <link rel="manifest" href="/manifest.json" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
      </Head>
      <NextAuth  session={pageProps.session}>
      <Provider  store={ store }>
        <Routes Component={Component} pageProps={pageProps}/>
      </Provider>
      </NextAuth>
    </>
  );
}
