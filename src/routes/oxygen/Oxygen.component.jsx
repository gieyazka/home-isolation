import React from "react";

import styles from "./Oxygen.module.scss";
const {
  wrapper,

  childcom,
  iconMenu,
  componet,
  center,
} = styles;
import Swal from "sweetalert2";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import moment from "moment";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { set } from "js-cookie";
const Oxygen = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [session, loading] = useSession();

  const [detail, setDetail] = React.useState(null);
  const [dataOxygen, setData] = React.useState(null);
  const [days, setDays] = React.useState(0);
  let data = null;
  React.useEffect(async () => {
    const loadingData = async () => {
      await axios
        .get(
          `https://ess.aapico.com/oxygens?username=${
            session.user.name
          }&date_gte=${new moment().subtract(6, "days").format("YYYYMMDD")}`
        )
        .then((r) => {
          // setDetail(r.data)
          setData(r.data);

          let data = r.data.filter(
            (data) =>
              data.date ===
              new moment().subtract(days, "days").format("YYYYMMDD")
          );
          let morningData = data.filter((d) => d.type === "morning");
          let afternoonData = data.filter((d) => d.type === "afternoon");
          let eveningData = data.filter((d) => d.type === "evening");

          setDetail({
            labels: ["Morning", "Afternoon", "Evening"],
            // ,afternoogData ? afternoonData[0].spo :  0,eveningData ? eveningData[0].spo : 0
            // afternoonData[0].pi,eveningData[0].pi
            datasets: [
              {
                label: "SPO",
                data: [
                  morningData[0] ? morningData[0].spo : 0,
                  afternoonData[0] ? afternoonData[0].spo : 0,
                  eveningData[0] ? eveningData[0].spo : 0,
                ],
                backgroundColor: "rgb(255, 99, 132)",
              },
              {
                label: "PR",
                data: [
                  morningData[0] ? morningData[0].pr : 0,
                  afternoonData[0] ? afternoonData[0].pr : 0,
                  eveningData[0] ? eveningData[0].pr : 0,
                ],

                backgroundColor: "rgb(54, 162, 235)",
              },
            ],
          });
        });
    };
    await loadingData();
  }, []);
  React.useEffect(() => {
    if (dataOxygen) {
      let data = dataOxygen.filter(
        (data) =>
          data.date === new moment().subtract(days, "days").format("YYYYMMDD")
      );
      let morningData = data.filter((d) => d.type === "morning");
      let afternoonData = data.filter((d) => d.type === "afternoon");
      let eveningData = data.filter((d) => d.type === "evening");

      setDetail({
        labels: ["Morning", "Afternoon", "Evening"],
        // ,afternoogData ? afternoonData[0].spo :  0,eveningData ? eveningData[0].spo : 0
        // afternoonData[0].pi,eveningData[0].pi
        datasets: [
          {
            label: "SPO",
            data: [
              morningData[0] ? morningData[0].spo : 0,
              afternoonData[0] ? afternoonData[0].spo : 0,
              eveningData[0] ? eveningData[0].spo : 0,
            ],
            backgroundColor: "rgb(255, 99, 132)",
          },
          {
            label: "PR",
            data: [
              morningData[0] ? morningData[0].pr : 0,
              afternoonData[0] ? afternoonData[0].pr : 0,
              eveningData[0] ? eveningData[0].pr : 0,
            ],

            backgroundColor: "rgb(54, 162, 235)",
          },
        ],
      });
    }
  }, [days]);
  const onSubmit = async (data) => {
    let type,
      hour = moment().hour();
    if (hour >= 3 && hour < 11) {
      type = "morning";
    } else if (hour >= 11 && hour < 17) {
      type = "afternoon";
    } else if (hour >= 17 && hour < 3) {
      type = "evening";
    }

    if (!data.PR || !data.SPO) {
      Swal.fire({
        icon: "info",
        title: "กรุณากรอกข้อมูลให้ครบ",
        showConfirmButton: false,
        timer: 1500,
      });
      return null;
    }
    await axios
      .get(`https://ess.aapico.com/users?username=${session.user.name}`)
      .then(async (r) => {
        await axios
          .get(
            `https://ess.aapico.com/oxygens?username=${
              r.data[0].username
            }&type=${type}&date=${new moment().format("YYYYMMDD")}`
          )
          .then(async (res) => {
            if (res.data[0]) {
              // console.log(r.data[0]);
              await axios
                .put(`https://ess.aapico.com/oxygens/${res.data[0].id}`, {
                  spo: data.SPO,
                  // pi: data.PI,
                  pr: data.PR,
                  location: r.data[0].location,
                  image: r.data[0].avatar
                    ? `https://ess.aapico.com${r.data[0].avatar.url} `
                    : null,
                })

                .then((d) => {
                  setDetail(d.data);
                  Swal.fire({
                    icon: "success",
                    title: "แก้ไขข้อมูลสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  setValue("PR", null, { shouldValidate: true });
                  setValue("SPO", null, { shouldValidate: true });
                });
            } else {
              await axios
                .post(`https://ess.aapico.com/oxygens`, {
                  date: new moment().format("YYYYMMDD"),
                  spo: data.SPO,
                  type: type,
                  // pi: data.PI,
                  pr: data.PR,
                  username: r.data[0].username,
                  location: r.data[0].location,
                  image: r.data[0].avatar
                    ? `https://ess.aapico.com${r.data[0].avatar.url} `
                    : null,
                })
                .then((d) => {
                  setDetail(d.data);
                  Swal.fire({
                    icon: "success",
                    title: "บันทึกข้อมูลสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  setValue("PR", null, { shouldValidate: true });
                  setValue("SPO", null, { shouldValidate: true });
                });
            }
          });
      });
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  const controlDays = (type) => {
    if (type === "delete") {
      if (days >= 0 && days < 7) {
    
        setDays(days + 1);
      }
    } else {
      if (days > 0) {
        
        setDays(days - 1);
      }
    }
  };
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
        className='flex items-center justify-center w-screen text-center'
          style={{
            
            backgroundColor: "#ECECED",
            borderColor: "#ECECED",
            zIndex: -1,
            height: "15%",
            
          }}
        >
            <ArrowBackIosIcon style={days === 7 ? {color : '#dddddd'}: {}} onClick={() => controlDays("delete")} />{" "}
          {moment().subtract(days, "days").format("DD/MM/YYYY")}{" "}
          <ArrowForwardIosIcon  style={days === 0 ? {color : '#dddddd'} : {}}  onClick={() => controlDays("add")} />
        </div>
        <div
          style={{ marginTop: -1, backgroundColor: "#ECECED", zIndex: 99 }}
          className="  text-center  w-screen "
        >
        
          <Bar className="px-2" data={detail && detail} options={options} />
          {/* <div
            className="  w-11/12 h-full mx-auto rounded-md flex  flex-col "
            style={{ backgroundColor: "#F6F6F6" }}
          >
            <div
              className="mt-2 mx-auto rounded-full h-32 w-32 border-4 flex flex-col items-center justify-center"
              style={{ borderColor: "#199CA6" }}
            >
              <text className="text-3xl">{detail && detail.spo} %</text>
              <br />
              <text className="text-xl">SPO2</text>
            </div>
            <div className=" mx-6 flex justify-between">
              {/* <div
                className=" rounded-full h-32 w-32 z-50 border-4 flex flex-col items-center justify-center"
                style={{ borderColor: "#199CA6" }}
              >
                <text className="text-3xl">{detail && detail.pi}</text>
                <br />
                <text className="text-xl">PI</text>
              </div> *
              <div
                className=" rounded-full h-32 w-32 z-50 border-4 flex flex-col items-center justify-center"
                style={{ borderColor: "#199CA6" }}
              >
                <text className="text-3xl">{detail && detail.pr}</text>
                <br />
                <text className="text-xl">PR</text>
              </div>
            </div>
            <text className="pt-4">PULSE OXEMETER RESULTS</text>
          </div> */}
        </div>
        <div
          className={`${componet}   w-12/12`}
          style={{ marginTop: -1, backgroundColor: "#ECECED" }}
        >
          {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
          <div className="  w-11/12 h-full mx-auto rounded-md flex items-center ">
            <div className="flex flex-col">
              {/* <LocationOnIcon className={iconMenu} /> */}
              <img
                className={`mx-auto h-25vw md:h-8vw p-2  `}
                src="/assets/oxygen_satuation.svg"
              />
              {/* <p>oxygen Satuation</p> */}
            </div>
            <div className={`${center} flex-col`}>
              <div>ค่าผลลัพธ์</div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" whitespace-nowrap ">
                  <label> ระดับออกซิเจนในเลือด (SpO2) = </label>
                  <input
                    className=" w-1/4  "
                    type="number"
                    {...register("SPO")}
                  />
                </div>
                {/* <div className='mt-2' >
                <label className=" whitespace-nowrap mt-2">
                  {" "}
                  ค่าการไหลเวียนของเลือด (PI) = &nbsp;{" "}
                </label>

                <input
                  className=" w-1/4  "
                  type='number'
                  {...register("PI")}
                />
                </div> */}
                <div className="mt-2">
                  <label className=" whitespace-nowrap ">
                    {" "}
                    อัตราการเต้นของหัวใจ (PR) = &nbsp;&nbsp; &nbsp;{" "}
                  </label>
                  <input
                    className=" w-1/4  "
                    type="number"
                    {...register("PR")}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    style={{
                      border: " 2px solid #FEAB20",
                      cursor: "pointer",
                      borderRadius: 4,
                      color: "#FEAB20",
                      marginTop: 8,
                      padding: "0.5rem",
                      borderWidth: 2,
                    }}
                  >
                    อัพเดตข้อมูล
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Oxygen;