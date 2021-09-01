import React from "react";
import Image from "components/image";
import styles from "./Location.module.scss";
const {
  wrapper,
  landing,
  landingText,
  landingImage,
  landingNavigationWrapper,
  childcom,
  iconMenu,
  componet,
  center,
} = styles;
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useGeolocation } from "react-use";
import Button from "@material-ui/core/Button";
import { signIn, signOut, useSession } from "next-auth/client";
import dynamic from "next/dynamic";
import Swal from 'sweetalert2'

const Map = dynamic(
  () => {
    // return import("react-qr-barcode-scanner");
    return import("./map");
  },
  { ssr: false }
);
const Location = () => {
  const state = useGeolocation();
  const [session, loading] = useSession();
  const [locationState, setLocationState] = React.useState();
  const [hospitalState, setHospitalState] = React.useState();
  const [userState, setUserState] = React.useState();
  const [selectHospital, setSelectHospital] = React.useState(null);
    console.log(session);

  const updateLocation = async () => {
    await axios
      .get(`https://ess.aapico.com/users?username=${session.user.name}`, {
        headers: {
          Authorization:
            "Bearer " + session.user.jwt,
        },
      })
      .then(async (r) => {
        // console.log(r.data[0].id);
        await axios
          .put(`https://ess.aapico.com/users/${r.data[0].id}`, {
            location: {
              address: `${locationState.tambon_e},${locationState.amphoe_e},${locationState.province_e},${locationState.postcode}`,
              coordinates: { lat: state.latitude, lon: state.longitude },
              hospital: selectHospital,
            },
          }, {
            headers: {
              Authorization:
                "Bearer " + session.user.jwt,
            },
          })
          .then((r) => 
          {
            Swal.fire({
              icon: 'success',
              title: 'บันทึกข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1500
          })
          });
        // console.log(
        //   JSON.stringify({
        //     address: `${locationState.tambon_e},${locationState.amphoe_e},${locationState.province_e},${locationState.postcode}`,
        //     coordinates: { lat: state.latitude, lon: state.longitude },
        //     hospital: selectHospital,
        //   })
        // );
      });
  };
  React.useEffect(async () => {
    // console.log(state);
    const getUser = async ()=>{
      return await axios
      .get(`https://ess.aapico.com/users?username=${session.user.name}`, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(sessionStorage.getItem("user")).jwt,
          },
        }).then(r=>r.data[0])
    }
    const getHospital = async () => {
      return await axios
        .get(
          `https://maps.powermap.live/api/v2/map/reverse_geocode_hospital?lat=${state.latitude}&lng=${state.longitude}&radius=20&limit=10&offset=0&access_token=b378c575291af30a29f59919fd7e7e4c012d45c4`
        )
        .then((r) => r.data.data);
    };
    const getLocation = async () => {
      return await axios
        .get(
          `https://search.map.powermap.in.th/api/v2/map/reverse_geocode?lat=${state.latitude}&lng=${state.longitude}&sort=d&&access_token=b378c575291af30a29f59919fd7e7e4c012d45c4`
        )
        .then((r) => r);
    };
    if (process.browser) {
      if (!state.loading) {
        getHospital().then((r) => {
          setHospitalState(r);
          setSelectHospital(r[0].name_t);
        });
        getUser().then(r=>{
          setUserState(r)
        })
        getLocation().then((r) => {
          setLocationState(r.data.data[0]);
        });
      }
    }
  }, [state.loading]);
  // console.log(userState);
  return (
    <div className={wrapper}>
      <div
        className={childcom}
        style={{
          fontFamily: "Bai Jamjuree",
          // height: "100vh",
          overflowX: "hidden",
          color: "black",
        }}
      >
        <div style={{}} className="text-center w-screen h-2/5">
          {/* <text className=" text-6xl text-  mt-auto mb-auto">Map</text> */}

          {state.latitude && <Map lat={state.latitude} lon={state.longitude} />}
        </div>
        <div className={componet} style={{ backgroundColor: "#ECECED" }}>
          <div className=" flex items-center justify-center">
            <div className="flex items-center">
              <LocationOnIcon className={iconMenu} />
            </div>
            <div className="flex items-center">
              <div className={`${center}`}>
                <div className="px-4">
                  <p className="font-bold pt-2">My Location</p>
                  {locationState ? (
                    <p className="mt-3">
                      {locationState.tambon_e},{locationState.amphoe_e},
                      {locationState.province_e},{locationState.postcode}
                    </p>
                  ) : null}
                  <br />
                  <div className="w-ful h-0.5 bg-black"></div>
                  <br />
                  <p className="font-bold">Near Hospital</p>
                  <div>
                    {hospitalState && (
                      <Autocomplete
                        onChange={(e, v) => setSelectHospital(v)}
                        id="free-solo-demo"
                        freeSolo
                        defaultValue={hospitalState[0].name_t}
                        options={
                          hospitalState &&
                          hospitalState.map((hospital) => hospital.name_t)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="โรงพยาบาล"
                            margin="normal"
                            // variant="outlined"
                          />
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2">
            {" "}
            <Button
              onClick={updateLocation}
              variant="contained"
              color="primary"
            >
             {userState && userState.location && userState.location.hospital ? 'Update' : 'Submit' } 
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Location;
