import React from 'react';
import Image from 'components/image';
import { useForm } from "react-hook-form";
import styles from './Loginpage.module.scss';
import store from 'stores';
import { useRouter } from 'next/router'
import { checkLogin } from '../../utils/api'
import Swal from 'sweetalert2'
import image from 'components/image';
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link';
import axios from 'axios'
// import { useUser } from './user';
const {
    wrapper,
    landing,
    landingText,
    landingImage,
    landingNavigationWrapper
} = styles;
interface Loginpage {
    onClick: any,
  }
type FormData = {
    identifier: string;
    password: string;
};

const Loginpage = () => {
    const [ session, loading ] = useSession()
    const router = useRouter()
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = handleSubmit(async data => {
        // console.log(data);

        await checkLogin(data.identifier, data.password).then((res: any): any => {
            if (res.err) {
                Swal.fire({

                    icon: 'error',
                    title: 'เข้าสู้ระบบไม่สำเร็จ',
                    text: 'กรุณาตรวจสอบ username และ password',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
               
                Swal.fire({
                    icon: 'success',
                    title: 'เข้าสู่ระบบสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // console.log(res.data.user);
                    store.dispatch({
                        type: 'UPDATE_USER',
                        user: {
                            username: res.data.user.username,
                            isLoggin: true,
                            company: res.data.user.company,
                            email: res.data.user.email,
                            emp_id: res.data.user.empID,
                            image : "ess.aapico.com"+res.data.user.avatar.url
                        }
                    })
        //   {console.log(JSON.parse((sessionStorage.getItem("user") || '{}' ))) }
                    const user : any =  {
                        username: res.data.user.username,
                        isLoggin: true,
                        company: res.data.user.company,
                        email: res.data.user.email,
                        emp_id: res.data.user.empID,
                        image : "ess.aapico.com"+res.data.user.avatar.url
                    }
        // setCookie('user',JSON.stringify(user),5)

                    // console.log(user);
                            signIn('credentials',
        {
          username : data.identifier,
          password : data.password,
          callbackUrl: `${window.location.origin}/`
        }
      )

                    // sessionStorage.setItem('user', JSON.stringify(user));
                    // router.push('/')

                })

            }

        })

    });
    // console.log(store.getState());

    return (

        <div style={{ fontFamily: 'Bai Jamjuree', backgroundColor: 'rgba(26,156,166,255)', minHeight: '100vh', maxHeight: '100vh' }}>
                 
    {/* {session && <>
      Signed in as {session.user!.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>} */}
                        <div className=' h-10'></div>
            <img className=' w-56 h-24  ml-auto mr-auto' src="/assets/logo.png" />
            <form className='text-black h-3/4' onSubmit={onSubmit}>

                <h2 className='text-center mt-12 text-xl text-white'>Login</h2>
                <div className='mt-4 w-2/3 bg-white ml-auto mr-auto rounded-2xl'>

                    <input placeholder='User ID.' className=' w-10/12 h-16 text-base ml-4 border-b border-black' {...register("identifier")} />
                    <input type='password' placeholder='Password' className='w-10/12 h-16 text-base ml-4' {...register("password")} />

                </div>
                <div className='w-full text-center'>
                    <label  onClick={() => { window.open('https://ess.aapico.com/#/register') }}   className='bg-white text-lg  px-8 py-2 mt-4 rounded-lg mr-4 ml-auto'>Register</label>
                    <button type="submit" className='bg-white  text-lg px-9 py-2 mt-4 rounded-lg mr-auto'>Login</button>
                </div>
            </form>


  <img className=' w-18 h-18 mt-12  ml-auto mr-auto' src="/assets/AAPICO_LOGO.png" />
  <p className='text-center text-white text-lg mt-3'>Powered by AAPICO ITS</p>
        </div>




    );
}


export default Loginpage
