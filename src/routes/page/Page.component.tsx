import React from 'react';
import Head from 'next/head';
import Landing from 'routes/page/landing';
import A2HS from 'components/a2hs';
import Sidebar from 'components/sidebar';
import Html from 'components/html';
import { usePageData, usePageDetails } from 'hooks/page';
import { injectClassNames } from 'utils/css';
import styles from './Page.module.scss';

const {
  page,
  pageLanding,
  pageContent,
  placeholder
} = styles;

type PageProps = {
    isLanding?: boolean
};

export const addTitleTags = (title: string): JSX.Element => {
  if (!title) {
    return <></>;
  }

  return (
    <>
      <title>{ title }</title>
      <meta name="og:title" content={ title } />
    </>
  );
};

export const addDescriptionTag = (description: string): JSX.Element => {
  if (!description) {
    return <></>;
  }

  return (
    <meta
      name="description"
      property="og:description"
      content={ description }
    />
  );
};

export default function Page(props: PageProps): JSX.Element {
  const { isLanding } = props;
  const { title = 'Covid Home Isolation', description = '' } = usePageDetails();
  const { content = '' } = usePageData();

  const classNames = injectClassNames(page, [pageLanding, isLanding]);

  return (
    <>
      <Head>
        { addTitleTags( 'Covid Home Isolation') }
        { addDescriptionTag(description) }
        <meta name="robots" content="INDEX,FOLLOW" />
      </Head>
      { isLanding && <Landing /> }
  
   
    </>
  );
}
