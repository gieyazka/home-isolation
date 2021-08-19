import React from 'react';
import Image from 'components/image';
import { useForm } from "react-hook-form";
import styles from './Layout.module.scss';
import Header from 'components/header';
import Footer from 'components/footer';
import { AppProps } from 'next/app';
import Head from 'next/head';
const {
    wrapper,
    landing,
    landingText,
    landingImage,
    landingNavigationWrapper
  } = styles;

  type FormData = {
    firstName: string;
    lastName: string;
  };
  
  const  Layout = ({ Component, pageProps }: AppProps) :JSX.Element => {
  return (
    <div className={ wrapper } style={{backgroundColor : 'rgba(26,156,166,255)'}}>

27
     </div>
  );
}
export default  Layout