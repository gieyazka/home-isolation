import React from "react";
import Image from "components/image";
import styles from "./Soscenter.module.scss";
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
import Button from "@material-ui/core/Button";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import axios from "axios";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useGeolocation } from "react-use";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import dynamic from "next/dynamic";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { signIn, signOut, useSession } from "next-auth/client";
import Swal from "sweetalert2";
import moment from "moment";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
const Map = dynamic(
  () => {
    // return import("react-qr-barcode-scanner");
    return import("../location/map");
  },
  { ssr: false }
);
const Soscenter = () => {
  const state = useGeolocation();
  const [session, loading] = useSession();
  const [locationState, setLocationState] = React.useState();
  const [page, setPage] = React.useState(1);
  const [request, setRequest] = React.useState(null);

  const [checked, setChecked] = React.useState({
    food: false,
    medicine: false,
  });
  const handleChange = (type, event) => {
    if(type === 'remark'){
      setChecked({ ...checked, remark: event.target.value });

    }else if (type === "food") {
      setChecked({ ...checked, food: event.target.checked });
    } else {
      setChecked({ ...checked, medicine: event.target.checked });
    }
  };
  const requestData = async () => {
    if (!checked.food && !checked.medicine) {
      Swal.fire({
        icon: "info",
        title: "กรุณาเลือกอาหารหรือยา",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    await axios
      .get(`https://ess.aapico.com/users?username=${session.user.name}`, {
        headers: {
          Authorization:
            "Bearer " + session.user.jwt,
        },
      })
      .then(async (userData) => {
        await axios
          .get(
            `https://ess.aapico.com/homeisolations?username=${
              session.user.name
            }&date=${new moment().format("YYYYMMDD")}`, {
              headers: {
                Authorization:
                  "Bearer " + session.user.jwt,
              },
            }
          )
          .then(async (r) => {
            if (r.data[0]) {
              await axios
                .put(`https://ess.aapico.com/homeisolations/${r.data[0].id}`, {
                  remark : checked.remark || null,
                  food: checked.food,
                  medicine: checked.medicine,
                  location: {
                    address: `${locationState.tambon_e},${locationState.amphoe_e},${locationState.province_e},${locationState.postcode}`,
                    coordinates: { lat: state.latitude, lon: state.longitude },
                  },
                  image: userData.data[0].avatar
                    ? `https://ess.aapico.com${userData.data[0].avatar.url} `
                    : null,
                }, {
                  headers: {
                    Authorization:
                      "Bearer " + session.user.jwt,
                  },
                })
                .then((r) => {
                  Swal.fire({
                    icon: "success",
                    title: "แก้ไขข้อมูลสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
            } else {
              await axios
                .post(`https://ess.aapico.com/homeisolations`, {
                  remark : checked.remark || null,
                  date: new moment().format("YYYYMMDD"),
                  username: session.user.name,
                  food: checked.food,
                  medicine: checked.medicine,
                  location: {
                    address: `${locationState.tambon_e},${locationState.amphoe_e},${locationState.province_e},${locationState.postcode}`,
                    coordinates: { lat: state.latitude, lon: state.longitude },
                  },
                  image: userData.data[0].avatar
                    ? `https://ess.aapico.com${userData.data[0].avatar.url} `
                    : null,
                }, {
                  headers: {
                    Authorization:
                      "Bearer " + session.user.jwt,
                  },
                })
                .then((res) => {
                  Swal.fire({
                    icon: "success",
                    title: "บันทึกข้อมูลสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
            }
          });
      });
  };
  React.useEffect(async () => {
    const getData = async () => {
      await axios
        .get(
          `https://ess.aapico.com/homeisolations?username=${session.user.name}&_sort=date:DESC`, {
            headers: {
              Authorization:
                "Bearer " + session.user.jwt,
            },
          }
        )
        .then((r) => setRequest(r.data));
    };
    if (page === 2) {
      getData();
    }
  }, [page]);
  React.useEffect(async () => {
    const getLocation = async () => {
      return await axios
        .get(
          `https://search.map.powermap.in.th/api/v2/map/reverse_geocode?lat=${state.latitude}&lng=${state.longitude}&sort=d&&access_token=b378c575291af30a29f59919fd7e7e4c012d45c4`
        )
        .then((r) => r);
    };
    if (!state.loading) {
      getLocation().then((r) => {
        setLocationState(r.data.data[0]);
      });
    }
  }, [state.loading]);
  const updateData = async (id) => {
    await axios
      .put(`https://ess.aapico.com/homeisolations/${id}`, {
        receive: true,
      }, {
        headers: {
          Authorization:
            "Bearer " + session.user.jwt,
        },
      })
      .then(async (data) => {
        console.log(data.data);
        let obj = request.find((o) => o.id === id);
        obj.receive = data.data.receive;
        let arr = request.filter((x) => {
          return x.id != id;
        });
        arr.push(obj);
        // console.log(obj);
        setRequest(arr);
        Swal.fire({
          icon: "success",
          title: "ยืนยันการรับอาหาร/ยา สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  // console.log(request);
  if (page === 1) {
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
          <div
            style={{ backgroundColor: "#ECECED", height: "10%" }}
            className="flex justify-end pr-4 w-screen"
          >
            <div
              onClick={() => setPage(2)}
              className="flex-col justify-center items-center text-center"
            >
              <PermIdentityIcon style={{ fontSize: "6vh" }} />
              <p>My request</p>
            </div>
          </div>
          <div style={{ height: "30%" }} className="text-center  w-screen ">
            {state.latitude && (
              <Map lat={state.latitude} lon={state.longitude} />
            )}
          </div>
          <div className={componet} style={{ backgroundColor: "#ECECED" }}>
            {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
            <div className="flex items-center">
              <LocalHospitalIcon className={iconMenu} />
            </div>
            <div className="flex items-center">
              <div className={center}>
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

                  <div className="flex items-center justify-center text-center ">
                    <div className="flex items-center">
                      <Checkbox
                        checked={checked.food}
                        onChange={(e) => handleChange("food", e)}
                        name="checkedB"
                        color="primary"
                      />
                      <p>อาหาร</p>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        checked={checked.medicine}
                        onChange={(e) => handleChange("medicine", e)}
                        name="checkedB"
                        color="primary"
                      />
                      <p>ยา</p>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                  <label>หมายเหตุ</label>
                  <TextareaAutosize aria-label="minimum height" onChange={(e)=>handleChange('remark',e)} minRows={3} placeholder="หมายเหตุ" />
                  </div>
                  <div className="mt-2 w-full text-center">
                    <Button
                      onClick={() => requestData()}
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={wrapper}>
        <div
          className={childcom}
          style={{
            fontFamily: "Bai Jamjuree",
            // height: "100vh",
            // overflowX: "hidden",
            color: "black",
          }}
        >
          <div
            style={{ backgroundColor: "#ECECED", height: "90%" }}
            className="flex-col justify-center pl-4 pr-4 w-screen"
          >
            <div
              onClick={() => setPage(1)}
              className="flex-col justify-center items-center text-right"
            >
              <PermIdentityIcon style={{ fontSize: "6vh" }} />
              <p>Request</p>
            </div>
            <div className='overflow-y-scroll' style={{height : '85%'}}>
              {request &&
                request.map((data) => (
                  <div
                    key={data.id}
                    className="mt-2 lg:flex shadow rounded-lg border  border-gray-400"
                  >
                    <div className="bg-blue-600 rounded-lg lg:w-2/12 py-2 block h-full shadow-inner">
                      <div className="text-center tracking-wide">
                        <div className="text-white font-bold text-2xl ">
                          {moment(data.date).format("DD")}
                        </div>
                        <div className="text-white font-normal text-xl">
                          {moment(data.date).format("MMM")}
                        </div>
                      </div>
                    </div>
                    <div className="w-full  lg:w-11/12 xl:w-full px-1 bg-white lg:px-2 lg:py-2 tracking-wide">
                      <div className="font-semibold text-gray-800 text-xl pt-2 text-center lg:text-left px-2">
                        {data.food && (
                          <Chip
                            label="อาหาร"
                            variant="outlined"
                            color="primary"
                            className=" m-1"
                          />
                        )}
                        {data.medicine && (
                          <Chip
                            label="ยา"
                            variant="outlined"
                            color="primary"
                            className="m-1"
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-row items-center w-full lg:w-1/3 bg-white lg:justify-end justify-center px-2 py-4 lg:px-0">
                      {!data.receive && (
                        <Button
                          onClick={() => updateData(data.id)}
                          variant="contained"
                          color="primary"
                        >
                          ได้รับอาหาร/ยาแล้ว
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            {/* end screen */}
          </div>
        </div>
      </div>
    );
  }
};
export default Soscenter;
