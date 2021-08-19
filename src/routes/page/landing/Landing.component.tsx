import React from "react";
import Image from "components/image";
import Link from "next/link";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import styles from "./Landing.module.scss";
const {
  wrapper,
  landing,
  landingText,
  landingImage,
  landingNavigationWrapper,
  imgsize,
  iconMenu,
  sizetop
} = styles;
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import PhoneIcon from "@material-ui/icons/Phone";
export default function Landing(): JSX.Element {
  return (
    <div>
      <div
        style={{
          fontFamily: "Bai Jamjuree",
          height: "100vh",
          overflowX: "hidden",
        }}
      >
        <div
          // style={{ paddingTop: "25vh" }}
          className={`${sizetop} text-center  w-screen `}
        >
          <img src='/assets/covid.jpg' className={`${imgsize} opacity-40 absolute  w-full z-0 object-cover`} />
          <div className=' text-black z-10 absolute translate-x-2/4 translate-y-2/4 w-screen text-center' style={{top : '25vh'}}>
          <text className=" text-6xl text-  mt-auto mb-auto">Covid - 19</text>
         <br /> <text className=" text-2xl  mt-auto mb-auto">SOS Center</text>
         </div>
        </div>
        <div className="  h-2/4" style={{backgroundColor : '#ECECED'}}>
          <div className="flex flex-wrap justify-around pt-4 ">
            <Link href="/location">
              <div
                style={{ width: "30vw", height: "18vh" ,backgroundColor : '#F6F6F6'}}
                className=" flex justify-center items-center rounded-xl text-center "
              >
                <div className="flex-row">
                  <LocationOnIcon
                  
                    className={iconMenu}
                  />
                  <p className=" text-base text-gray-500">My location</p>
                </div>
              </div>
            </Link>
            <Link href="/oxygen">
            <div
              style={{ width: "30vw", height: "18vh",backgroundColor : '#F6F6F6' }}
              className=" flex justify-center items-center rounded-xl text-center bg-white"
            >
              <div className="flex-row">
                <img
                  className="mx-auto h-20vw md:h-8vw p-2"
           
                  src="/assets/oxygen_satuation.svg"
                />
                <p className=" mt-1  text-gray-500">Oxygen Saturation</p>
              </div>
            </div>
            </Link>
            <Link href="/soscenter">
            <div
              style={{ width: "30vw", height: "18vh" ,backgroundColor : '#F6F6F6'}}
              className=" flex justify-center items-center rounded-xl text-center bg-white"
            >
              <div className="flex-row">
              
              <PermIdentityIcon
                  
                  className={iconMenu}
                />
                {/* <img
                  className="mx-auto h-20vw md:h-8vw p-2"
             
                  src="/assets/SOS.png"
                /> */}
                <p className=" mt-1  text-gray-500">Need</p>
              </div>
            </div>
            </Link>
            <div
              style={{ width: "30vw", height: "18vh",backgroundColor : '#F6F6F6' }}
              className="mt-2 flex justify-center items-center rounded-xl text-center bg-white"
            >
              <div className="flex-row">
                <LocalHospitalIcon
            
                  className={iconMenu}
                />
                <p className="  text-gray-500">Hospital</p>
                PhoneIcon
              </div>
            </div>
            <div
              style={{ width: "30vw", height: "18vh" ,backgroundColor : '#F6F6F6'}}
              className="mt-2  flex justify-center items-center rounded-xl text-center bg-white"
            >
              <div className="flex-row">
                <PhoneIcon
                  // style={{ fontSize: "20vw" }}
                  className={iconMenu}
                />
                <p className="  text-gray-500">Call Center</p>
              </div>
            </div>
            <div
              style={{ width: "30vw", height: "18vh",backgroundColor : '#F6F6F6' }}
              className="mt-2  flex justify-center items-center rounded-xl text-center bg-white"
            >
              <div className="flex-row">
                <img
                  className="mx-auto h-20vw md:h-8vw p-2"
                  // style={{ height: "20vw" }}
                  src="/assets/news.png"
                />
                <p className="   text-gray-500">Covid News</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
