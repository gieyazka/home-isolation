import React from "react";
import Head from "next/head";
import Image from "components/image";
import Icon from "components/icon";
import Placeholder from "components/placeholder";
import { useUser } from "hooks/user";
import styles from "./Profile.module.scss";
import { isExternalModuleNameRelative } from "typescript";
import { signIn, signOut, useSession } from "next-auth/client";
import { type } from "os";
import { getSession } from "next-auth/client";
const {
  profile,
  profileMain,
  profilePicture,
  profileContent,
  followersIcon,
  followersPlaceholder,
  about,
} = styles;
interface Isession {
  name: string;
  image: string;
  email: string;
}
export interface ISubmitResult {
  success: boolean;
  message: string;
}

export default function Profile(): JSX.Element {
  const { username, company, emp_id, email, isLoggin, image } = useUser();
  const [session, loading] = useSession();
  const [state, setState] = React.useState<Isession>();
  console.log();

  React.useEffect(() => {
    // if (loading === true) {
      setState({
        name:' string',
        image:' string',
        email:' string'
      });
    // }
  }, []);
  // console.log(state);
  if(!loading){
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={profile}>
        <div className={profileMain}>
          <img
            // isPlaceholder={!image}
            src={session?.user?.image || ""}
            className={profilePicture}
          />
          {!session && (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
          {session && (
            <>
              <button onClick={() => signOut()}>Sign out</button>
            </>
          )}
          {session?.user?.image}
          <div className={profileContent}>
            <h1>
              sadsadsadasd
              <Placeholder content={username} length="short" />
            </h1>
          </div>
        </div>
        <div className={about}>
          <h2>About</h2>
          <p>asdsadsadsadsad</p>
        </div>
      </main>
    </>
  );
}else{
  return <>
  test</>
}
}
